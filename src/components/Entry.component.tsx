import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import EntryService from '../services/entries.service';
const Entry: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialEntryState = {
  _id: "",
  title: "",
	description: "",
	priority: "",
	category: "",
	area: "",
	product: "",
  toBeFixedByVer: "",
  assignedDeveloperIds: [],
  creatorAccountId: "",
  isReadyForTesting: false,
  resolutionStatus: "",
  isClosed: false,

  };
  const [currentEntry, setCurrentEntry] = useState<any>(initialEntryState);
  const [message, setMessage] = useState<string>("");
  const getEntry = (id: string) => {
    EntryService.getOneEntryByIdUser(id)
      .then((response: any) => {
        setCurrentEntry(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id)
      getEntry(id);
  }, [id]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEntry({ ...currentEntry, [name]: value });
  };
  const updateEntry = () => {
    EntryService.updateEntryDeveloper(currentEntry._id, currentEntry)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The entry was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteEntry = () => {
    EntryService.deleteEntryAdmin(currentEntry.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/entries");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return ( <div>
      {currentEntry ? (
        <div className="edit-form">
          <h4>Entry</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentEntry.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentEntry.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <input
                type="text"
                className="form-control"
                id="priority"
                name="priority"
                value={currentEntry.priority}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentEntry.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                className="form-control"
                id="area"
                name="area"
                value={currentEntry.area}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product">Product</label>
              <input
                type="text"
                className="form-control"
                id="product"
                name="product"
                value={currentEntry.product}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tobeFixedByVer">To be Fixed by Ver</label>
              <input
                type="text"
                className="form-control"
                id="tobeFixedByVer"
                name="tobeFixedByVer"
                value={currentEntry.tobeFixedByVer}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="assignedDeveloperIds">Assigned Developers</label>
              <input
                type="text"
                className="form-control"
                id="assignedDeveloperIds"
                name="assignedDeveloperIds"
                value={currentEntry.assignedDeveloperIds}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="creatorAccountId">Creator</label>
              <input
                type="text"
                className="form-control"
                id="creatorAccountId"
                name="creatorAccountId"
                value={currentEntry.creatorAccountId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isReadyForTesting">Ready for Testing</label>
              <input
                type="text"
                className="form-control"
                id="isReadyForTesting"
                name="isReadyForTesting"
                value={currentEntry.isReadyForTesting}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resolutionStatus">Resolution Status</label>
              <input
                type="text"
                className="form-control"
                id="resolutionStatus"
                name="resolutionStatus"
                value={currentEntry.resolutionStatus}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isClosed">Closed</label>
              <input
                type="text"
                className="form-control"
                id="isClosed"
                name="isClosed"
                value={currentEntry.isClosed}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteEntry}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateEntry}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Entry...</p>
        </div>
      )}
    </div> );
};
export default Entry;