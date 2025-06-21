import { Image } from "react-bootstrap";
const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const isDataUrl = (image) => {
  return typeof image === "string" && image.startsWith("data");
};

const getTypeofImage = (dataUrl) => {
  return dataUrl.slice(dataUrl.indexOf("/") + 1, dataUrl.indexOf(";"));
};

const DEFAULT_IMAGE = "/ai_image.jpg";
//data must inserted into a FormData object to support multiple image files being sent
export default function processEditorData(articleEditorData) {
  let articleEditorDataCopy = { ...articleEditorData };
  const formData = new FormData();
  let currentImageIndex = 0;
  //need to check if images are cloudinary images (meaning they are cloudinary urls) or base64 encoded data urls

  // if article main image is the default one, process it into an image file
  if (articleEditorDataCopy.image == DEFAULT_IMAGE) {
    const tempImage = <Image src={DEFAULT_IMAGE} />;
    fetch(tempImage.src)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "ai_image.jpg", { type: blob.type });
        articleEditorDataCopy.image = file;
      });
  }

  if (isDataUrl(articleEditorDataCopy.image)) {
    articleEditorDataCopy.image = dataURLtoFile(articleEditorDataCopy.image);
    formData.append("main_image", articleEditorDataCopy.image);
    currentImageIndex++;
  }

  //go through all the body sections and their own blocks
  //for each block, if we encounter an image that's a cloudinary url, we just leave it alone
  //otherwise, we convert the dataurl image into a file,
  // append it to the FormData object,
  //  and replace the image url with a placeholder containing the position of its corresponding image in the FormData array

  articleEditorDataCopy.articleBody.forEach((bodySection, sectionIndex) => {
    bodySection.blocks.forEach((block, blockIndex) => {
      if ((block.type = "image" && isDataUrl(block.data.url))) {
        const imageFile = dataURLtoFile(
          block.data.url,
          block.data.caption + "." + getTypeofImage(block.data.url)
        );

        formData.append("images", imageFile, imageFile.name);
        articleEditorDataCopy.articleBody[sectionIndex].blocks[
          blockIndex
        ].data.url = { imageIndex: currentImageIndex };
        currentImageIndex++;
      }
    });
  });

  //insert final editor data into formdata
  formData.append("articleEditorData", JSON.stringify(articleEditorDataCopy));

  return formData;
}
