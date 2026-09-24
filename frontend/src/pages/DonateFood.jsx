import { useState } from "react";

function DonateFood() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodType, setFoodType] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [location, setLocation] = useState("");

  const [donationId, setDonationId] = useState("");
  const [matches, setMatches] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMatches([]);

    const donation = {
      foodName,
      quantity,
      foodType,
      expiryTime,
      location
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/donations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(donation)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Failed to post donation.");
        return;
      }

      setDonationId(data.donation._id);

      alert("Food donation posted successfully!");

      setFoodName("");
      setQuantity("");
      setFoodType("");
      setExpiryTime("");
      setLocation("");

    } catch (error) {
      console.log(error);
      alert("Unable to connect to server.");
    }
  };

  const findMatch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/match/${donationId}`,
        {
          method: "POST"
        }
      );

      const data = await response.json();

      setMatches(data.matches || []);

      if (!data.matches || data.matches.length === 0) {
        alert("No suitable shelter found right now.");
      }

    } catch (error) {
      console.log(error);
      alert("Unable to find matching shelters.");
    }
  };

  return (
    <div className="portal-page">

      {/* HEADER */}

      <section className="portal-header">

        <div>
          <span className="portal-tag">
            FOOD DONOR PORTAL
          </span>

          <h1>Donate Surplus Food</h1>

          <p>
            Turn safe, edible surplus food into meals for
            people who need them.
          </p>
        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          Rescue network active
        </div>

      </section>


      {/* MAIN AREA */}

      <div className="portal-layout">

        {/* LEFT FORM */}

        <div className="portal-form-card">

          <div className="form-card-heading">
            <div className="heading-icon">🍱</div>

            <div>
              <h2>Food Details</h2>
              <p>
                Tell us about the surplus food available
                for pickup.
              </p>
            </div>
          </div>

          <form
            className="professional-form"
            onSubmit={handleSubmit}
          >

            <div className="field-group">
              <label>Food Name</label>

              <input
                type="text"
                value={foodName}
                onChange={(e) =>
                  setFoodName(e.target.value)
                }
                placeholder="e.g. Veg Thali, Rice, Sandwiches"
                required
              />

              <small>
                Enter a simple description of the food.
              </small>
            </div>


            <div className="form-row">

              <div className="field-group">
                <label>Number of Meals</label>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  placeholder="e.g. 50"
                  required
                />
              </div>


              <div className="field-group">
                <label>Food Type</label>

                <select
                  value={foodType}
                  onChange={(e) =>
                    setFoodType(e.target.value)
                  }
                  required
                >
                  <option value="">
                    Select food type
                  </option>

                  <option value="vegetarian">
                    Vegetarian
                  </option>

                  <option value="non-vegetarian">
                    Non-Vegetarian
                  </option>
                </select>
              </div>

            </div>


            <div className="form-row">

              <div className="field-group">
                <label>Safe Until</label>

                <input
                  type="time"
                  value={expiryTime}
                  onChange={(e) =>
                    setExpiryTime(e.target.value)
                  }
                  required
                />

                <small>
                  Approximate time before the food expires.
                </small>
              </div>


              <div className="field-group">
                <label>Pickup Location</label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="e.g. Malviya Nagar, Jaipur"
                  required
                />
              </div>

            </div>


            <div className="form-notice">
              <span>🛡️</span>

              <p>
                Please donate only food that is safe,
                hygienic and suitable for consumption.
              </p>
            </div>


            <button
              className="portal-submit"
              type="submit"
            >
              Post Food Donation
              <span>→</span>
            </button>

          </form>

        </div>


        {/* RIGHT SIDE */}

        <aside className="portal-sidebar">

          <div className="sidebar-card highlight-card">

            <span className="sidebar-eyebrow">
              WHAT HAPPENS NEXT?
            </span>

            <h3>Your food starts a rescue journey.</h3>

            <div className="mini-process">

              <div className="mini-step">
                <span>1</span>
                <div>
                  <strong>Post</strong>
                  <p>Submit surplus food details.</p>
                </div>
              </div>

              <div className="mini-line"></div>

              <div className="mini-step">
                <span>2</span>
                <div>
                  <strong>Match</strong>
                  <p>
                    We find shelters with compatible needs.
                  </p>
                </div>
              </div>

              <div className="mini-line"></div>

              <div className="mini-step">
                <span>3</span>
                <div>
                  <strong>Deliver</strong>
                  <p>
                    Food is picked up and delivered.
                  </p>
                </div>
              </div>

              <div className="mini-line"></div>

              <div className="mini-step">
                <span>4</span>
                <div>
                  <strong>Impact</strong>
                  <p>
                    Delivered meals count toward impact.
                  </p>
                </div>
              </div>

            </div>

          </div>


          <div className="sidebar-card">

            <div className="sidebar-icon">⚡</div>

            <h3>Smart Allocation</h3>

            <p>
              A donation can be distributed across multiple
              shelters when one shelter doesn't need the
              entire quantity.
            </p>

          </div>

        </aside>

      </div>


      {/* AFTER POSTING */}

      {donationId && matches.length === 0 && (
        <section className="match-action-card">

          <div>
            <span className="portal-tag">
              DONATION POSTED
            </span>

            <h2>Ready to find a shelter?</h2>

            <p>
              Run the matching engine to find shelters
              whose food preference and current requirement
              match this donation.
            </p>
          </div>

          <button onClick={findMatch}>
            Find Matching Shelters →
          </button>

        </section>
      )}


      {/* MATCH RESULTS */}

      {matches.length > 0 && (
        <section className="match-results">

          <div className="results-heading">

            <div>
              <span className="portal-tag">
                MATCH SUCCESSFUL
              </span>

              <h2>Matched Shelters</h2>

              <p>
                Your donation has been allocated based on
                current shelter requirements.
              </p>
            </div>

            <div className="match-check">✓</div>

          </div>


          <div className="matched-grid">

            {matches.map((match) => (
              <div
                className="matched-shelter-card"
                key={match.shelterId}
              >

                <div className="shelter-symbol">
                  🏠
                </div>

                <div className="matched-details">
                  <h3>{match.shelterName}</h3>

                  <p>
                    📍 {match.location}
                  </p>
                </div>

                <div className="meal-allocation">
                  <strong>
                    {match.allocatedMeals}
                  </strong>

                  <span>MEALS</span>
                </div>

              </div>
            ))}

          </div>

        </section>
      )}

    </div>
  );
}

export default DonateFood;