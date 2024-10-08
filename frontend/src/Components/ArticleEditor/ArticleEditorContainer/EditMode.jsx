import React, { useState } from "react";

export default function EditMode({ data, onChange }) {
  const [localData, setLocalData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData({
      ...localData,
      [name]: value,
    });
    onChange({
      ...localData,
      [name]: value,
    });
  };

  const handleBodySectionChange = (index, key, value) => {
    const newSections = [...localData.bodySections];
    newSections[index][key] = value;
    setLocalData({
      ...localData,
      bodySections: newSections,
    });
    onChange({
      ...localData,
      bodySections: newSections,
    });
  };

  return (
    <div className="edit-mode">
      <div>
        <label>Title</label>
        <input
          type="text"
          name="header"
          value={localData.header.text || ""}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="desc"
          value={localData.desc.text || ""}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={localData.author || ""}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={localData.image || ""}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Body Sections</label>
        {localData.bodySections.map((section, index) => (
          <div key={index}>
            <label>Section Title</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) =>
                handleBodySectionChange(index, "title", e.target.value)
              }
            />
            <label>Section Content</label>
            <textarea
              value={section.content}
              onChange={(e) =>
                handleBodySectionChange(index, "content", e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
