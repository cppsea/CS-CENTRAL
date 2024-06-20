import { useEffect, useState } from "react";
import { Container, Form, Stack, Button, Row, Col } from "react-bootstrap";
import SavedArticleItem from "./SaveArticleItem/SavedArticleItem";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ArrowMarker from "../../ArrowMarker/ArrowMarker";
import "../Settings.scss";
import SavedArticlesSearchBar from "./SearchBar/SavedArticlesSearchBar";
import useBookmark from "../../../hooks/useBookmark";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
const test_articles = [
  {
    id: 0,
    image:
      "https://builtin.com/cdn-cgi/image/f=auto,quality=80,width=752,height=435/https://builtin.com/sites/www.builtin.com/files/styles/byline_image/public/2021-12/machine-learning-examples-applications.png",
    title: "Supervised, Unsupervised, and Reinforcement Learning Techniques",
    description: "Brief description about this topic...",
  },
  {
    id: 1,
    image:
      "https://imageio.forbes.com/specials-images/dam/imageserve/966248982/960x0.jpg?height=456&width=711&fit=bounds",
    title: "Supervised, Unsupervised, and Reinforcement Learning Techniques",
    description: "Brief description about this topic...",
  },
  {
    id: 2,
    image:
      "https://imageio.forbes.com/specials-images/dam/imageserve/966248982/960x0.jpg?height=456&width=711&fit=bounds",
    title: "Machine Learning in Business and Marketing",
    description: "Brief description about this topic...",
  },
];

export default function SavedArticles() {
  const { isLoading, error, updateBookmark } = useBookmark();

  //array all the articles currently not deleted
  const [articles, setArticles] = useState([]);

  //the state of the articles of whether they are being deleted or not, is object, key = article id, value = whether it is selected orn ot
  const [isDeletedArticles, setIsDeletedArticles] = useState({});

  //toggler of selected state for a specific article
  //this returns a FUNCTION that toggles an article's state with the provided id
  const articleToggleHandler = (id) => () =>
    setIsDeletedArticles((prevArticles) => {
      return { ...prevArticles, [id]: !prevArticles[id] };
    });

  //deselects all articles from deletion
  const resetDeletionHandler = () => {
    let resetArticles = {};
    articles.forEach(({ id }) => {
      resetArticles[id] = false;
    });
    setIsDeletedArticles(resetArticles);
  };

  //use effect to get articles upon page load once, also init selected state of every article as false
  //just simulating retrieving articles
  // Show any error from the server if possible
  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    let initArticles = async () => {
      let retrieved_articles = await test_articles;
      setArticles(retrieved_articles);

      let initIsDeletedArticles = {};
      retrieved_articles.forEach(({ id }) => {
        initIsDeletedArticles[id] = false;
      });
      setIsDeletedArticles(initIsDeletedArticles);
    };

    initArticles();
  }, [error]);

  //simply removed the selected articles from the displayed articles state
  //insert backend actions here
  const updateSavedArticles = () => {
    //filter out kept articles, replace articles state with them
    let keptArticles = articles.filter(
      (article) => !isDeletedArticles[article.id]
    );
    setArticles(keptArticles);

    //reset selected state
    let initIsDeletedArticles = {};
    keptArticles.forEach(({ id }) => {
      initIsDeletedArticles[id] = false;
    });
    setIsDeletedArticles(initIsDeletedArticles);
  };

  // Submit handler (the yes button in modal does not trigger submit event)
  // The function updateSavedArticles will be only executed if the server returns a response successfully
  const submitHandler = () => {
    articles.forEach((article, article_id) =>
      updateBookmark(
        article_id,
        isDeletedArticles[article_id],
        updateSavedArticles
      )
    );
  };

  //state for whether delete confirmation modal is displayed or now
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  //show and hide handlers
  const showDeleteConfirm = () => setDeleteConfirmOpen(true);
  const hideDeleteConfirm = () => setDeleteConfirmOpen(false);

  //state for search bar
  const [searchbarText, setSearchbarText] = useState("");

  //search bar search handler *implement later
  const searchHandler = () => {
    console.log(searchbarText);
  };
  return (
    <Container className="my-3 h-100 d-flex flex-column m-0" fluid>
      <h2 className="text-uppercase settings-header">Saved Articles</h2>
      <div className="settings-divider"></div>

      <Form className="flex-grow-1">
        <Container fluid>
          <Row>
            <Col
              xs={12}
              md={6}
              className="d-flex justify-content-center my-2 px-0"
            >
              <div className="settings-section-header-container">
                <div className="settings-arrow-marker-container">
                  <ArrowMarker />
                </div>
                <h4 className="text-uppercase settings-section-header">
                  My Bookmarks
                </h4>
              </div>
            </Col>
            <Col
              xs={12}
              md={6}
              className="d-flex justify-content-xs-start justify-content-md-end my-2 px-0"
            >
              <SavedArticlesSearchBar
                textState={searchbarText}
                setText={setSearchbarText}
                searchHandler={searchHandler}
              />
            </Col>
          </Row>
        </Container>

        <div className="d-flex flex-wrap gap-4 p-0 pt-4">
          {isLoading ? (
            <div className="flex flex-grow-1 text-center align-content-center">
              <AiOutlineLoading3Quarters className="loading" />
            </div>
          ) : (
            articles.map((article) => (
              <SavedArticleItem
                key={article.id}
                articleImg={article.image}
                articleTitle={article.title}
                toBeDeleted={isDeletedArticles[article.id]}
                deleteToggler={articleToggleHandler(article.id)}
              />
            ))
          )}
        </div>
        {/*Remove/Cancel will only show if there are any articles selected to be deleted*/}
        {Object.values(isDeletedArticles).some((isDeleted) => isDeleted) && (
          <Stack direction="horizontal" gap={3} className="justify-content-end">
            <div>
              <Button
                className="settings-confirm-button"
                onClick={showDeleteConfirm}
              >
                Remove
              </Button>
            </div>
            <div>
              <Button
                className="settings-cancel-button"
                onClick={resetDeletionHandler}
              >
                Cancel
              </Button>
            </div>
          </Stack>
        )}
        <ConfirmDeleteModal
          isOpen={deleteConfirmOpen}
          handleClose={hideDeleteConfirm}
          submitHandler={submitHandler}
        />
      </Form>
    </Container>
  );
}
