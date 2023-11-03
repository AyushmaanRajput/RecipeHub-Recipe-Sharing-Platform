import {
  Box,
  Flex,
  Image,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Text,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";

function SingleRecipe() {
  const [recipe, setRecipe] = useState({
    _id: "65448293032528ba26e1a8d0",
    userId: "654268a6ae82dd883efdcf08",
    title: "Litti Chokha",
    images: [
      "images\\1698988691462.jpg",
      "images\\1698988691463.jpg",
      "images\\1698988691464.jpg",
    ],
    description:
      "A traditional North Indian dish consisting of stuffed wheat balls baked over coal or cow dung cakes.",
    ingredients: [
      "2 cups whole wheat flour",
      "1/2 cup ghee or oil",
      "1 teaspoon carom seeds (ajwain)",
      "Salt to taste",
      "Water for kneading",
      "1 cup roasted gram flour (sattu)",
      "1 onion (finely chopped)",
      "2-3 green chilies (finely chopped)",
      "1 teaspoon ginger-garlic paste",
      "1/2 teaspoon mustard oil",
      "2 tablespoons lemon juice",
      "Fresh coriander leaves (chopped)",
      "2 large eggplants (baingan)",
      "4 tomatoes",
      "2-3 green chilies",
    ],
    instructions: [
      "For the dough, mix whole wheat flour, ghee, carom seeds, salt, and knead into a stiff dough. Rest for 30 minutes.",
      "For the stuffing, mix roasted gram flour with all ingredients listed for stuffing.",
      "Divide the dough into small balls, flatten each ball, fill with the stuffing, and seal the edges.",
      "Bake the stuffed balls over low flame until they turn golden and crisp.",
      "Roast eggplants, tomatoes, green chilies on an open flame until they're charred and soft.",
      "Peel the charred skin from eggplants and tomatoes, mash them together.",
    ],
    caption:
      "A flavorful and rustic delicacy from the heart of North India! Hope you guys enjoy it!",
    veg: true,
    tags: ["Healthy", "Quick"],
    cuisine: ["Indian"],
    likes: [],
    comments: [],
    __v: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleChangeImage = (nextIndex) => {
    setCurrentImageIndex(nextIndex);
  };
  console.log(recipe);

  return (
    <DIV>
      <input type="radio" id="i1" name="images" defaultChecked />
      <input type="radio" id="i2" name="images" />
      <input type="radio" id="i3" name="images" />
      <div className="container">
      {recipe?.images?.length > 0 &&
        recipe.images.map((ele, index) => (
          <div
            key={index}
            className={`slide_img ${index === currentImageIndex ? "active" : ""}`}
            id={`img-${index + 1}`}
          >
            <img
              src={`http://localhost:8080/${ele}`}
              alt={`Recipe ${index + 1}`}
            />

            <label
              className="prev"
              htmlFor={`i${index === 0 ? recipe.images.length : index}`}
              onClick={() => {
                handleChangeImage(index === 0 ? recipe.images.length - 1 : index - 1);
              }}
            >
              <span>&#x2039;</span>
            </label>
            <label
              className="next"
              htmlFor={`i${index === recipe.images.length - 1 ? 1 : index + 2}`}
              onClick={() => {
                handleChangeImage(index === recipe.images.length - 1 ? 0 : index + 1);
              }}
            >
              <span>&#x203a;</span>
            </label>
          </div>
        ))}

      <div id="nav_slide">
        {recipe?.images?.length > 0 &&
          recipe.images.map((ele, index) => (
            <label
              htmlFor={`i${index + 1}`}
              className={`dots ${index === currentImageIndex ? "active" : ""}`}
              id={`dot${index + 1}`}
            ></label>
          ))}
      </div>
      </div>

      <Tabs isFitted>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DIV>
  );
}

export default SingleRecipe;

const DIV = styled.div`
  #i1,
  #i2,
  #i3,
  #i4,
  #i5 {
    display: none;
  }

  .img {
    border-radius: 10px;
  }

  .container {
    margin: 0 auto;
    margin-top: 20px;
    position: relative;
    width: 70%;
    height: 0;
    padding-bottom: 38%;
    user-select: none;
    border-radius: 10px;
  }

  .container .slide_img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .container .slide_img img {
    width: inherit;
    height: inherit;
  }

  .prev,
  .next {
    width: 12%;
    height: inherit;
    position: absolute;
    top: 0;
    color: rgba(244, 244, 244, 0.9);
    z-index: 99;
    transition: 0.45s;
    cursor: pointer;
    text-align: center;
  }

  .next {
    right: 0;
  }
  .prev {
    left: 0;
  }

  label span {
    position: absolute;
    font-size: 100pt;
    top: 50%;
    transform: translateY(-50%);
  }

  .container #nav_slide {
    width: 100%;
    bottom: 12%;
    height: 11px;
    position: absolute;
    text-align: center;
    z-index: 99;
    cursor: default;
  }

  #nav_slide .dots {
    top: -5px;
    width: 18px;
    height: 18px;
    margin: 0 4px;
    position: relative;
    border-radius: 100%;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.6);
    transition: 0.4s;
  }

  #nav_slide .dots:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.9);
    transition: 0.25s;
  }

  .slide_img {
    z-index: -1;
  }

  #i1:checked ~ #one,
  #i2:checked ~ #two,
  #i3:checked ~ #three,
  #i4:checked ~ #four,
  #i5:checked ~ #five {
    z-index: 9;
    animation: scroll 1s ease-in-out;
  }

  #i1:checked ~ #nav_slide #dot1,
  #i2:checked ~ #nav_slide #dot2,
  #i3:checked ~ #nav_slide #dot3,
  #i4:checked ~ #nav_slide #dot4,
  #i5:checked ~ #nav_slide #dot5 {
    background-color: rgba(255, 255, 255, 0.9);
  }

  @keyframes scroll {
    0% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }

  /* .yt{
	margin: 0 auto;
	margin-top: 50px;
	position: relative;
	width: 150px;
	height:50px;
	border: outset #2c2c2c 4px;
	border-radius: 10px;
	text-align: center;
	font-size: 30pt;
	transition: .5s;
}

.yt a{
	text-decoration: none;
	color: #4c4c4c;
	transition: .5s;
}

.yt:hover{
	background: #4c4c4c;
	transition: .3s;
}

.yt:hover a{
	color: #fff;
	transition: .3s;
}
 */
  @media screen and (max-width: 685px) {
    .container {
      border: none;
      width: 100%;
      height: 0;
      padding-bottom: 55%;
    }

    label span {
      font-size: 50pt;
    }

    .prev,
    .next {
      width: 15%;
    }
    #nav_slide .dots {
      width: 12px;
      height: 12px;
    }
  }
  @media screen and(min-width: 970px) {
    .me {
      display: none;
    }
  }
`;
