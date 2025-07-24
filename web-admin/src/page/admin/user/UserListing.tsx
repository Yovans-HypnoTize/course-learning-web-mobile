import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserListing() {
  return (
    <>
      <div className="container">
        <div className="row">

          <div className="d-flex justify-content-between py-4">
            <h3>User Listing</h3>
            <div className="input-group w-25 me-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search the result..." />
              <span className="input-group-text">
                <Search size={16} />
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div>
                <table className="table table-striped">
                  <thead className="table-danger">
                    <tr>
                      <td>ID</td>
                      <td>Full Name</td>
                      <td>Email Address</td>
                      <td>Mobile Number</td>
                      <td>Joining Date</td>
                      <td>Subscription Type</td>
                      <td>Course</td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>deeee</td>
                      <td>deeee</td>
                      <td>deeee</td>
                      <td>deeee</td>
                      <td>deeee</td>
                      <td>deeee</td>
                      <td><Link to={"/user-payment-details"}>ewwwwwwwww</Link></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
