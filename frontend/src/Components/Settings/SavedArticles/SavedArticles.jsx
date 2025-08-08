import { useEffect, useState } from "react";
import { Container, Form, Stack, Button, Row, Col } from "react-bootstrap";
import SavedArticleItem from "./SaveArticleItem/SavedArticleItem";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ArrowMarker from "../../ArrowMarker/ArrowMarker";
import "../Settings.scss";
import SavedArticlesSearchBar from "./SearchBar/SavedArticlesSearchBar";
import { useGetBookmarks } from "../../../hooks/useGetBookmarks";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDeleteMultipleBookmarks } from "../../../hooks/useDeleteMultipleBookmarks";
import toast from "react-hot-toast";
import { useLoadingSpinner } from "../../../context/SpinnerContext";

export default function SavedArticles() {
  const { user } = useAuthContext();

  const { getBookmarks } = useGetBookmarks();
  const { deleteMultipleBookmarks } = useDeleteMultipleBookmarks();
  const { showSpinner, hideSpinner } = useLoadingSpinner();

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
  useEffect(() => {
    let initArticles = async () => {
      let result = await getBookmarks();

      if (result.error) {
        return;
      }

      let resultArticles = result.articles;
      setArticles(resultArticles);

      let initIsDeletedArticles = {};
      resultArticles.forEach(({ id }) => {
        initIsDeletedArticles[id] = false;
      });
      setIsDeletedArticles(initIsDeletedArticles);
    };

    initArticles();
  }, []);

  //submit handler (the yes button in modal does not trigger submit event)
  //simply removed the selected articles from the displayed articles state

  const submitHandler = async () => {
    if (!user) {
      toast.error("You must be logged in to delete bookmarks.");
      return;
    }

    let deleteArticleIDs = [];
    for (const [articleId, isDelete] of Object.entries(isDeletedArticles)) {
      if (isDelete) {
        deleteArticleIDs.push(articleId);
      }
    }

    showSpinner();

    let result = await deleteMultipleBookmarks(deleteArticleIDs);
    await ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))(250);

    if (result.error) {
      return;
    }

    toast.success("Bookmarks successfully deleted.");

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

    hideSpinner();
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
          {!user && <span>Log in to access bookmarked articles.</span>}
          {articles.map((article) => (
            <SavedArticleItem
              key={article.id}
              articleImg={article.image}
              articleTitle={article.header.blocks[0].data.text}
              toBeDeleted={isDeletedArticles[article.id]}
              deleteToggler={articleToggleHandler(article.id)}
            />
          ))}
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
