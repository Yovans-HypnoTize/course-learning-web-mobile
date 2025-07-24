import { Search } from 'lucide-react'

export default function UserPaymentDetails() {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between py-4'>
                        <h3>User Payment Details</h3>
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

                    <div className='card'>
                        <div className='card-body'>
                            <table className='table table-striped'>
                                <thead className='table-danger'>
                                    <tr>
                                        <td>ID</td>
                                        <td>Course</td>
                                        <td>Plan Name</td>
                                        <td>Months</td>
                                        <td>Amount (RS)</td>
                                        <td>Payment Status</td>
                                        <td>Subscription Status</td>
                                        <td>Course Status</td>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr>
                                        <td>deeeee</td>
                                        <td>deeeee</td>
                                        <td>deeeee</td>
                                        <td>deeeee</td>
                                        <td>deeeee</td>
                                        <td>deeeee</td>
                                        <td>deeeee</td>
                                        <td>deeeee</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
