import { useEffect, useState } from "react";
import { API_URL } from "../config";

function Driver() {
  const [donations, setDonations] = useState([]);

  const loadDonations = async () => {
    const response = await fetch(
      `${API_URL}/api/donations`
    );

    const data = await response.json();
    setDonations(data);
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(
      `${API_URL}/api/donations/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      }
    );

    loadDonations();
  };

  return (
    <div className="driver-page">

      <div className="page-header">
        <div>
          <span className="page-tag">VOLUNTEER PORTAL</span>
          <h1>Driver Dashboard</h1>
          <p>
            View food rescue assignments and update delivery progress.
          </p>
        </div>
      </div>

      <div className="delivery-grid">

        {donations.map((donation) => (
          <div className="delivery-card" key={donation._id}>

            <div className="delivery-card-header">
              <div>
                <h2>{donation.foodName}</h2>
                <span className="meal-count">
                  {donation.quantity} meals
                </span>
              </div>

              <span
                className={`status-badge status-${donation.status}`}
              >
                {donation.status}
              </span>
            </div>

            <div className="pickup-box">
              <span className="info-label">PICKUP FROM</span>
              <p>📍 {donation.location}</p>
            </div>

            {donation.matches &&
              donation.matches.length > 0 && (
                <div className="destination-section">

                  <span className="info-label">
                    DELIVERY DESTINATIONS
                  </span>

                  {donation.matches.map((match) => (
                    <div
                      className="destination"
                      key={match.shelterId}
                    >
                      <div>
                        <strong>{match.shelterName}</strong>
                        <p>📍 {match.location}</p>
                      </div>

                      <span className="allocated-meals">
                        {match.allocatedMeals} meals
                      </span>
                    </div>
                  ))}

                </div>
              )}

            <div className="delivery-actions">

              {donation.status === "matched" && (
                <button
                  className="primary-action"
                  onClick={() =>
                    updateStatus(
                      donation._id,
                      "picked-up"
                    )
                  }
                >
                  ✓ Mark as Picked Up
                </button>
              )}

              {donation.status === "picked-up" && (
                <button
                  className="primary-action"
                  onClick={() =>
                    updateStatus(
                      donation._id,
                      "delivered"
                    )
                  }
                >
                  ✓ Mark as Delivered
                </button>
              )}

              {donation.status === "delivered" && (
                <div className="completed-message">
                  ✓ Delivery Completed
                </div>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Driver;