import { useState } from "react";

function Shelter() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [currentNeed, setCurrentNeed] = useState("");
  const [foodPreference, setFoodPreference] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shelter = {
      name,
      location,
      capacity,
      currentNeed,
      foodPreference
    };

    try {
      const response = await fetch(
        `${API_URL}/api/shelters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(shelter)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Failed to submit food request.");
        return;
      }

      console.log(data);

      alert("Food request submitted successfully!");

      setName("");
      setLocation("");
      setCapacity("");
      setCurrentNeed("");
      setFoodPreference("");

    } catch (error) {
      console.log(error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="portal-page">

      {/* HEADER */}

      <section className="portal-header">

        <div>
          <span className="portal-tag">
            RECIPIENT PORTAL
          </span>

          <h1>Request Surplus Food</h1>

          <p>
            Share your organization's current food
            requirement and become available for matching.
          </p>
        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          Matching network active
        </div>

      </section>


      <div className="portal-layout">

        {/* FORM */}

        <div className="portal-form-card">

          <div className="form-card-heading">

            <div className="heading-icon">
              🏠
            </div>

            <div>
              <h2>Shelter Details</h2>

              <p>
                Help us understand your current capacity
                and food requirement.
              </p>
            </div>

          </div>


          <form
            className="professional-form"
            onSubmit={handleSubmit}
          >

            <div className="field-group">

              <label>
                Organization / Shelter Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. Hope Shelter"
                required
              />

            </div>


            <div className="field-group">

              <label>Location</label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="e.g. Mansarovar, Jaipur"
                required
              />

              <small>
                This is used as the food delivery
                destination.
              </small>

            </div>


            <div className="form-row">

              <div className="field-group">

                <label>Total Capacity</label>

                <input
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(e) =>
                    setCapacity(e.target.value)
                  }
                  placeholder="e.g. 100"
                  required
                />

                <small>
                  Maximum meals you can handle.
                </small>

              </div>


              <div className="field-group">

                <label>Meals Needed Now</label>

                <input
                  type="number"
                  min="1"
                  value={currentNeed}
                  onChange={(e) =>
                    setCurrentNeed(e.target.value)
                  }
                  placeholder="e.g. 40"
                  required
                />

                <small>
                  Your current food requirement.
                </small>

              </div>

            </div>


            <div className="field-group">

              <label>Food Preference</label>

              <select
                value={foodPreference}
                onChange={(e) =>
                  setFoodPreference(e.target.value)
                }
                required
              >

                <option value="">
                  Select preference
                </option>

                <option value="vegetarian">
                  Vegetarian
                </option>

                <option value="non-vegetarian">
                  Non-Vegetarian
                </option>

                <option value="any">
                  Any Food Type
                </option>

              </select>

            </div>


            <div className="form-notice">

              <span>💡</span>

              <p>
                Keep your current requirement accurate.
                The matching engine uses this value when
                allocating available meals.
              </p>

            </div>


            <button
              className="portal-submit"
              type="submit"
            >
              Submit Food Request
              <span>→</span>
            </button>

          </form>

        </div>


        {/* RIGHT SIDE */}

        <aside className="portal-sidebar">

          <div className="sidebar-card highlight-card">

            <span className="sidebar-eyebrow">
              HOW MATCHING WORKS
            </span>

            <h3>
              Receive food based on your actual need.
            </h3>

            <div className="matching-rule">

              <div className="rule-icon">
                01
              </div>

              <div>
                <strong>Current Need</strong>

                <p>
                  Shelters that currently need meals are
                  considered for matching.
                </p>
              </div>

            </div>


            <div className="matching-rule">

              <div className="rule-icon">
                02
              </div>

              <div>
                <strong>Food Preference</strong>

                <p>
                  The donated food must be compatible with
                  your selected preference.
                </p>
              </div>

            </div>


            <div className="matching-rule">

              <div className="rule-icon">
                03
              </div>

              <div>
                <strong>Smart Allocation</strong>

                <p>
                  Meals are allocated according to current
                  requirements and available quantity.
                </p>
              </div>

            </div>

          </div>


          <div className="sidebar-card need-card">

            <span className="need-icon">
              ♥
            </span>

            <div>
              <strong>
                Keep your need accurate
              </strong>

              <p>
                After meals are allocated, your current
                requirement automatically decreases.
              </p>
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default Shelter;