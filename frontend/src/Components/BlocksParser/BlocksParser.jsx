import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { Figure } from "react-bootstrap";
//returns parsed article
//separating these into switch cases in case we need to have different logic for each type of block
export default function BlocksParser({ blocks }) {
  return blocks.map((block, index) => {
    let processedBlock = null;
    let processedHtmlString = null;

    switch (block.type) {
      case "paragraph":
        processedHtmlString = DOMPurify.sanitize(block.data.text);
        processedBlock = parse(processedHtmlString);
        break;
      case "header":
        processedHtmlString = DOMPurify.sanitize(block.data.text);
        processedBlock = parse(processedHtmlString);
        break;
      case "image":
        processedBlock = (
          <Figure key={block.data.url}>
            <Figure.Image src={block.data.url} />
            <Figure.Caption>{block.data.caption}</Figure.Caption>
          </Figure>
        );
        break;
      case "list":
        let listItemElements = block.data.items.map((item, index) => {
          let itemProcessedHTMLString = DOMPurify.sanitize(item);
          return <li key={item + index}>{parse(itemProcessedHTMLString)}</li>;
        });
        processedBlock = <ol>{listItemElements}</ol>;
        break;
      default:
        break;
    }

    return processedBlock;
  });
}
