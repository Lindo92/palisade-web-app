import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import accountsService from "../services/accounts.service";
import EntryService from "../services/entries.service"
const EntriesList: React.FC = () => {
  const [entries, setEntries] = useState<Array<any>>([]);
  const [currentEntry, setCurrentEntry] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [creatorTitle, setCreatorTitle] = useState<string>("")
  useEffect(() => {
    retrieveEntries();
  }, []);
  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const retrieveEntries = () => {
    EntryService.getAllEntriesUser()
      .then((response: any) => {
        setEntries(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveEntries();
    setCurrentEntry(null);
    setCurrentIndex(-1);
  };
  const setActiveEntry = (entry: any, index: number) => {
    setCurrentEntry(entry);
    setCurrentIndex(index);
    getUserName(entry.creatorAccountId)
  };
  const removeEntryById = (id: string) => {
    EntryService.deleteEntryAdmin(id)
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getUserName = async (id: string) => {
    const account: any = await accountsService.getOneAccountByIdAdmin(id);
    console.log(account);
    setCreatorTitle(account.username)
  };
  const findByTitle = () => {
    EntryService.getEntriesTitleUser(searchTitle)
      .then((response: any) => {
        setEntries(response.data);
        setCurrentEntry(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (  <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Entries List</h4>
        <ul className="list-group">
          {entries &&
            entries.map((entry, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveEntry(entry, index)}
                key={index}
              >
                {entry.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentEntry ? (
          <div>
            <h4>Entry</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentEntry.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentEntry.description}
            </div>
            <div>
              <label>
                <strong>Priority:</strong>
              </label>{" "}
              {currentEntry.priority}
            </div>
            <div>
              <label>
                <strong>Category:</strong>
              </label>{" "}
              {currentEntry.category}
            </div>
            <div>
              <label>
                <strong>Area:</strong>
              </label>{" "}
              {currentEntry.area}
            </div>
            <div>
              <label>
                <strong>Product:</strong>
              </label>{" "}
              {currentEntry.product}
            </div>
            <div>
              <label>
                <strong>To be Fixed by Ver:</strong>
              </label>{" "}
              {currentEntry.toBeFixedByVersion}
            </div>
            <div>
              <label>
                <strong>Assigned Developers:</strong>
              </label>{" "}
              {currentEntry.assignedDeveloperIds}
            </div>
            <div>
              <label>
                <strong>Creator:</strong>
              </label>{" "}
              {creatorTitle}
            </div>
            <div>
              <label>
                <strong>Is ready for testing:</strong>
              </label>{" "}
              {currentEntry.isReadyForTesting ? 'yes' : 'no'}
            </div>
            <div>
              <label>
                <strong>Resolution Status:</strong>
              </label>{" "}
              {currentEntry.resolutionStatus}
            </div>
                        <div>
              <label>
                <strong>Closed:</strong>
              </label>{" "}
              {currentEntry.isClosed ? 'closed' : 'open'}
            </div>
            <Link
              to={"/tutorials/" + currentEntry._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
            <button onClick={() => removeEntryById(currentEntry._id)} className="=m-3 btn btn-sm btn-danger">
              Delete
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div> )
};
export default EntriesList;