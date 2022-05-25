import React, { useState, ChangeEvent } from "react";
import EntryService from "../services/entries.service"
const AddEntry: React.FC = () => {
  const initialEntryState = {
    title: "",
    description: "",
    priority: "",
    category: "",
    area: "",
    product: "",
  };
  const [entry, setEntry] = useState<any>(initialEntryState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEntry({ ...entry, [name]: value });
  };
  const saveEntry = () => {
    var data = {
      title: entry.title,
      description: entry.description,
      priority: entry.priority,
      category: entry.category,
      area: entry.area,
      product: entry.product,
    };
    EntryService.postEntryUser(data)
      .then((response: any) => {
        setEntry({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const newEntry = () => {
    setEntry(initialEntryState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form text-white">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEntry}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={entry.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={entry.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              className="form-control"
              id="priority"
              required
              value={entry.priority}
              onChange={handleInputChange}
              name="priority"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              required
              value={entry.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">Area</label>
            <input
              type="text"
              className="form-control"
              id="area"
              required
              value={entry.Area}
              onChange={handleInputChange}
              name="area"
            />
          </div>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <input
              type="text"
              className="form-control"
              id="product"
              required
              value={entry.product}
              onChange={handleInputChange}
              name="product"
            />
          </div>
          <button onClick={saveEntry} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddEntry;