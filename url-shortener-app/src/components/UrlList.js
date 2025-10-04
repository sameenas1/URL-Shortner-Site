import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUrl, editUrl } from "../redux/urlSlice";
import Pagination from "./Pagination";

export default function UrlList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allUrls = useSelector((state) => state.urls.urls);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editOriginalUrl, setEditOriginalUrl] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);

  const perPage = 2;

  if (!user) return <p>Please login to see your URLs.</p>;

  const userUrls = allUrls.filter((u) => u.userId === user.id);

  const filtered = userUrls.filter(
    (u) =>
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
      u.shortUrl.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  const startEdit = (u) => {
    setEditId(u.id);
    setEditTitle(u.title);
    setEditOriginalUrl(u.originalUrl);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditOriginalUrl("");
  };

  const saveEdit = (id) => {
    if (!editTitle.trim() || !editOriginalUrl.trim()) return;
    dispatch(editUrl({ id, userId: user.id, title: editTitle.trim(), originalUrl: editOriginalUrl.trim() }));
    cancelEdit();
  };

  const confirmDelete = (url) => {
    setUrlToDelete(url);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    if (urlToDelete) {
      dispatch(deleteUrl({ id: urlToDelete.id, userId: user.id }));
      setShowDeleteModal(false);
      setUrlToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUrlToDelete(null);
  };

  return (
    <div>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Search title or URL..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">No URLs found.</td>
            </tr>
          )}
          {pageItems.map((u) => (
            <tr key={u.id}>
              <td>
                {editId === u.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  u.title
                )}
              </td>
              <td>
                {editId === u.id ? (
                  <input
                    type="url"
                    className="form-control"
                    value={editOriginalUrl}
                    onChange={(e) => setEditOriginalUrl(e.target.value)}
                  />
                ) : (
                  <a href={u.originalUrl} target="_blank" rel="noreferrer">
                    {u.originalUrl}
                  </a>
                )}
              </td>
              <td>
                <a href={`/r/${u.shortUrl}`} target="_blank" rel="noreferrer">
                  short.ly/{u.shortUrl}
                </a>
              </td>
              <td>{u.addedAt}</td>
              <td>
                {editId === u.id ? (
                  <>
                    <button className="btn btn-sm btn-success me-2" onClick={() => saveEdit(u.id)}>
                      Save
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(u)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(u)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPosts={filtered.length}
        postsPerPage={perPage}
        setCurrentPage={setPage}
        currentPage={page}
      />

      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{urlToDelete?.title}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleDeleteConfirmed}>Delete</button>
                <button className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
