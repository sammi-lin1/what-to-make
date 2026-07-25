from pypdf import PdfReader
import pymupdf
import json
import re
from enum import Enum
import os

INGREDIENTS_THRESHOLD = 3

class Data(Enum):
    INGREDIENTS = 1
    RECIPE = 2
    NAME = 3

### returns the probablistic heuristic of the line being an ingredient line
def ingredient_score(line):
    score = 0
    # decimal values + vulgar fractions
    if re.match('[0-9\u00BC-\u00BE\u2150-\u215E]', line):
        score += 3
    
    # in the ingredient section colon is exlusively used to indicate a sub recipe name (technically part of the ingredients)
    if re.search('[:,]', line):
        score += 3

    # measurements
    if re.search(r'\b(?:cup|cups|tbsp|tsp|oz|lb|teaspoon|tablespoon|teaspoons|tablespoons|quart|handful|pinch|sprinkle|sprinkling|sprigs|sprig)\b', line.lower()):
        score += 3
    
    # ingredient specific adjectives
    if re.search(r'\b(?:\(optional\)|optional)\b', line.lower()):
        score += 3

    # utensils
    if re.search(r'\b(?:strainer)\b', line.lower()):
        score += 3

    # verbs (action words)
    if re.search(r'\b(?:chopped|divided|sliced|minced|frying|grated|dusting|garnish)\b', line.lower()):
        score += 2
        
    # prepositions (word that connects other words)
    if re.search(r'\b(?:for|of|for)\b', line):
        score += 1

    # conjunction (specifically just the word or)
    if re.search(r'\bor\b', line):
        score += 1
        
    return score

### read through the cookbook pdf file and save data to JSON file
def main():
    arr_data = []
    str_category = ""
    id = 0

    # Get the folder where parse_cookbook.py lives (this is to help the debugger find the right path)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_path = os.path.join(script_dir, "TK Cookbook 2025 ENG.pdf")
    json_path = os.path.join(script_dir, "tk_cookbook.json")

    # Open using the absolute path
    doc_cookbook = pymupdf.open(pdf_path)
    
    # normalize data and extract the category, ingredients, page, portion and recipe
    for page in doc_cookbook: 
        if page.number >= 2:
            page.get
            text = page.get_text("text")
            if re.match(r'^[a-zA-Z\s]+$', text): # the page that contains only letters and spaces is the category page
                str_category = text.strip()
                continue 
            print(text)
            # if not a category page then it must be a recipe page
            # portion is always at the top of the recipe page text
            str_portion = text.splitlines()[0]

            astr_text = text.splitlines()
            astr_ingredients = []
            astr_recipe = []
            int_data_switch = Data.INGREDIENTS
            for i, line in enumerate(astr_text):
                if i <= 0: # skip portion line because we just grabbed it
                    continue 
                
                if re.match(r'^[0-9]+\.(?![0-9])', line):
                    int_data_switch = Data.RECIPE
                
                match int_data_switch:
                    case Data.INGREDIENTS:
                        if astr_ingredients:
                            if re.match('[0-9A-Z\u00BC-\u00BE\u2150-\u215E]', line): 
                                astr_ingredients.append(line)
                            else:
                                astr_ingredients[-1] += " " + line
                        else:
                            astr_ingredients.append(line)
                    case Data.RECIPE:
                        if astr_recipe:
                            if line == "Ingredients" or line == "Method":
                                continue
                            elif re.match(r'^[0-9]+\.', line):
                                line = re.sub(r'^[0-9]+\.s*', '', line)
                                astr_recipe.append(line)
                            else:
                                astr_recipe[-1] += " " + line
                        else:
                            line = re.sub(r'^[0-9]+\.s*', '', line)
                            astr_recipe.append(line)
                    case _: raise ValueError("The value provided for int_data_switch is invalid: " + int_data_switch)

            # set data dictionary
            dict_dat = {
                "id": id,
                "category": str_category,
                "image" : "public/images/recipeCardImg.png",
                "ingredients": astr_ingredients,
                "name": "",
                "page": page.number + 1,
                "portions": str_portion,
                "recipe": astr_recipe
            }

            id+=1
            arr_data.append(dict_dat)
        
    
    # retrieve the name data which is nested inside the ingredients data
    for dict_data in arr_data:
        str_name = ""
        for index in range(len(dict_data["ingredients"]) - 1, -1, -1):
            # weigh the probability that the line is an ingredient 
            if ingredient_score(dict_data["ingredients"][index]) >= INGREDIENTS_THRESHOLD:
                dict_data["name"] = str_name
                break
            elif str_name == "":
                str_name = dict_data["ingredients"][index]
                dict_data["ingredients"].pop(len(dict_data["ingredients"]) - 1)
            else:
                str_name = dict_data["ingredients"][index] + " " + str_name
                dict_data["ingredients"].pop(len(dict_data["ingredients"]) - 1)

        # Save parsed data to JSON file
        with open(json_path, "w") as file:
            json.dump(arr_data, file)

if __name__ == "__main__":
    main()

# footnotes:
        # Extract the category
        # if re.match(r'^[a-zA-Z\s]+$', text): 
        # r stands for r string and is needed because we use the backslash
        # ^ and $ are our anchors and "wraps" our requirements. it tells it when to start and end. 
        #   if we didn't include $, it will check for the requirements at the beginning and allow anything to follow after
        #   If ^ was placed inside the bracket it means NOT
        # * indicates the previous token can be zero or more times -- an empty string would be considered a match.
        # + indicates the previous token (one or more) to ensure that the string is not empty
        # . indicates any single character except newline
        # [] are kind of like wildcards. they indicate that the string can contain any variation of whatever is inside
        #    example: [cat] would allow "cta" or "c" whereas c[hat] requires c to appear first followed by any variation of "hat"
        # re.match: looks for a match at the beginning of the string
        # re.search: searches the whole string to find a match anywhere