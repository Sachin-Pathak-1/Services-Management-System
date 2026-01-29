import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';

export default function CustomerList() {
  const navigate = useNavigate();
  const [customers] = useState([
    {
      id: 1,
      name: 'Bobby Gilbert',
      email: 'bobby@softnio.com',
      phone: '+342.675-6578',
      company: 'Softnio',
      payment: 'Visa',
      last4: '1955',
      status: 'Active',
      avatar: 'BB'
    },
    {
      id: 2,
      name: 'Olivia Poulsen',
      email: 'olivia@apple.com',
      phone: '+782.332-8328',
      company: 'Apple',
      payment: 'MasterCard',
      last4: '7473',
      status: 'Active',
      avatar: 'OP'
    },
    {
      id: 3,
      name: 'Heather Marahall',
      email: 'marshall@reaklit.com',
      phone: '+342.545-5639',
      company: 'Reaklit',
      payment: 'Visa',
      last4: '4355',
      status: 'Inactive',
      avatar: 'HM'
    },
    {
      id: 4,
      name: 'Benjamin Harris',
      email: 'info@mediavest.com',
      phone: '+342.675-6578',
      company: 'MediaVest',
      payment: 'Visa',
      last4: '3472',
      status: 'Pending',
      avatar: 'BH'
    },
    {
      id: 5,
      name: 'Joshua Kennedy',
      email: 'joshua@softnio.com',
      phone: '+323.345-8676',
      company: 'Softnio',
      payment: 'Visa',
      last4: '9878',
      status: 'Active',
      avatar: 'JK'
    },
    {
      id: 6,
      name: 'Justine Bauwens',
      email: 'bauwens@kline.com',
      phone: '+657.879-3214',
      company: 'Kline',
      payment: 'MasterCard',
      last4: '7657',
      status: 'Active',
      avatar: 'JB'
    }
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'active';
      case 'Inactive':
        return 'inactive';
      case 'Pending':
        return 'pending';
      default:
        return 'pending';
    }
  };

  const getPaymentBadgeClass = (payment) => {
    switch (payment) {
      case 'Visa':
        return 'visa';
      case 'MasterCard':
        return 'mastercard';
      default:
        return '';
    }
  };

  return (
    <div className="customer-list-container">
      <div className="container">
        {/* Header */}
        <div className="customer-list-header">
          <h1>Customers</h1>
          <button className="add-customer-btn">
            Add Customer
          </button>
        </div>

        {/* Controls */}
        <div className="customer-list-controls">
          <select className="bulk-action-select">
            <option>Bulk Action</option>
            <option>Delete</option>
            <option>Export</option>
          </select>
          <button className="apply-btn">
            Apply
          </button>
        </div>

        {/* Table */}
        <div className="customer-table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th className="checkbox-col">
                  <input type="checkbox" />
                </th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Payment Methods</th>
                <th>Status</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div className="customer-name-cell">
                      <div className={`customer-avatar avatar-${customer.avatar.toLowerCase()}`}>
                        {customer.avatar}
                      </div>
                      <span className="customer-name">{customer.name}</span>
                    </div>
                  </td>
                  <td className="customer-email">{customer.email}</td>
                  <td className="customer-phone">{customer.phone}</td>
                  <td className="customer-company">{customer.company}</td>
                  <td>
                    <span className={`payment-badge ${customer.payment.toLowerCase()}`}>
                      {customer.payment} ***{customer.last4}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="actions-col">
                    <button 
                      onClick={() => navigate(`/customer/${customer.id}`)}
                      className="view-btn"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
