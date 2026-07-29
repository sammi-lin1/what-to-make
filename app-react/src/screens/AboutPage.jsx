import "./AboutPage.css";

function AboutPage() {
  return (
    <>
      <div className="about-container">
        <div className="why-container">
          <h2>Why</h2>
          <p>
            One day, I found myself reaching for my stack of recipes from the
            GreenRoots Teaching Kitchen. I had no idea what to make and my mess
            of recipes wasn't helping. If only there was a way for me to
            randomly pick out a recipe from this stash!! I don't know... maybe
            something like closing my eyes and grabbing a random recipe!? Whose
            got time for that? Anyways, heres an over engineered solution with
            an under engineered website to solve that really pressing problem.
            Also I found this substack article about it if you wanted to learn
            more
          </p>
        </div>
        <div className="thankyou-container">
          <h2>Thank You</h2>
          <p>
            All the recipes from this website are from the GreenRoots Teaching
            Kitchen's 2025 Cookbook.{" "}
            <a
              href="https://greenrootsej.org/"
              target="_blank"
              className="a-greenroots"
            >
              GreenRoots
            </a>{" "}
            is a non profit organization fighting for environmental justice
            through youth advocacy groups, culinary classes, urban farming, and
            so so much more. Bit by bit, they genuinely are making their corner
            of the world that much better. If you have the time I highly
            encourage you to read more about their story and donate if you can!
            This website was made completely out of my own will and they are not
            asking me to say any of the above!
          </p>
          <p>
            Shout out to all the chefs and resources who contributed to the
            cookbook: Tiara Andress, Ashely Lujares, Veo Robert, Amarah Herzig,
            Aminah Herzig, Beatriz Abascal, Zulma Perez, Carolina Perez, Tabia
            Gustave, Gisele Gaffney, Valerie Nin, Ariane Chacker-Bourrut,
            Giovanny Zuniga, Ana Vanegas, Jazmin Castellon, Priyanka Rangadass,
            Barbara Espinosa, Trang Le, Brian Axelrod, Don Bennett, NYT Cooking,
            Serious Eats, Love and Lemons, HeartBeet Kitchen, All Recipes,
            Cooking for Keeps, Good Housekeeping, Food Network, Sally’s Baking
            Addiction, Delish, Bon Apetit, Adrian Foster, Jojo Emerson
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
