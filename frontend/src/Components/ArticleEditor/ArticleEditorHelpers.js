function couldBeCounted(block) {
  return "text" in block.data;
}

function getBlocksTextLen(blocks) {
  return blocks.filter(couldBeCounted).reduce((sum, block) => {
    sum += block.data.text.length;

    return sum;
  }, 0);
}

async function enforceCharLimit(content, event, api, charLimit) {
  const contentLen = getBlocksTextLen(content.blocks);

  if (contentLen > charLimit) {
    const workingBlock = event.detail.target;
    const workingBlockIndex = event.detail.index;
    const workingBlockId = workingBlock.id;

    // Get the current data of the working block
    const workingBlockSaved = content.blocks.find(
      (block) => block.id === workingBlockId
    );

    if (workingBlockSaved) {
      // Calculate the remaining character limit for the working block
      const otherBlocks = content.blocks.filter(
        (block) => block.id !== workingBlockId
      );
      const otherBlocksLen = getBlocksTextLen(otherBlocks);
      const workingBlockLimit = charLimit - otherBlocksLen;

      // Update the working block with the limited text
      try {
        await api.blocks.update(workingBlockId, {
          text: workingBlockSaved.data.text.substr(0, workingBlockLimit),
        });
      } catch (error) {
        console.error("Error updating block:", error);
      }
      // Adjust index if necessary based on the current block list
      api.caret.setToBlock(workingBlockIndex, "end");
    } else {
      console.error("Working block not found");
    }
  }
}

async function enforceBlockLimit(content, event, api, blockLimit) {
  if (api.blocks.getBlocksCount() > blockLimit) {
    //if they make another block, get the text from the new block
    //bring it to the previous block, and delete the new block

    const newBlockIndex = api.blocks.getCurrentBlockIndex();
    console.log(newBlockIndex)
    console.log(event.detail.target.id)
    const newBlockText = content.blocks.filter(
      (block) => block.id === event.detail.target.id
    )[0].data.text;
    const prevBlock = content.blocks[newBlockIndex - 1];
    api.blocks.update(prevBlock.id, {
      text: prevBlock.data.text + newBlockText,
    });
    api.blocks.delete(newBlockIndex);

  }
}

export {
  couldBeCounted,
  getBlocksTextLen,
  enforceBlockLimit,
  enforceCharLimit,
};
