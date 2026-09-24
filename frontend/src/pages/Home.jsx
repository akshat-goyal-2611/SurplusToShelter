import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDelivered: 0,
    mealsRescued: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard"
        );

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.log("Failed to load impact stats");
      }
    };

    loadStats();
  }, []);

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="home-hero">

        <div className="hero-content">

          <span className="hero-badge">
            ● LIVE FOOD RESCUE NETWORK
          </span>

          <h1>
            Turn Surplus Food Into
            <span> Someone's Next Meal.</span>
          </h1>

          <p>
            Connect surplus food with shelters that need it.
            Our smart matching system helps rescue edible food,
            coordinate delivery, and reduce waste.
          </p>

          <div className="hero-actions">

            <button
              className="hero-primary"
              onClick={() => navigate("/donate")}
            >
              Donate Surplus Food →
            </button>

            <button
              className="hero-secondary"
              onClick={() => navigate("/shelter")}
            >
              Request Food
            </button>

          </div>

          <div className="hero-trust">
            <span>✓ Quick donation</span>
            <span>✓ Smart matching</span>
            <span>✓ Delivery tracking</span>
          </div>

        </div>

        {/* RIGHT SIDE VISUAL */}
        <div className="hero-visual">

          <div className="rescue-card">

            <div className="rescue-card-top">
              <span className="live-dot"></span>
              Live Rescue
              <span className="matched-label">
                MATCHED
              </span>
            </div>

            <h3>Veg Thali</h3>

            <div className="rescue-quantity">
              <strong>30</strong>
              <span>meals available</span>
            </div>

            <div className="rescue-route">

              <div className="route-point">
                <div className="route-icon">🍽️</div>
                <div>
                  <small>PICKUP</small>
                  <p>Restaurant</p>
                </div>
              </div>

              <div className="route-line"></div>

              <div className="route-point">
                <div className="route-icon">🏠</div>
                <div>
                  <small>DELIVER TO</small>
                  <p>Matched Shelter</p>
                </div>
              </div>

            </div>

            <div className="rescue-success">
              ✓ Food rescue in progress
            </div>

          </div>

          <div className="floating-card floating-meals">
            <span>🌱</span>
            <div>
              <strong>{stats.mealsRescued}</strong>
              <small>Meals Rescued</small>
            </div>
          </div>

        </div>

      </section>


      {/* LIVE IMPACT */}
      <section className="home-impact">

        <div className="impact-intro">
          <span>OUR IMPACT</span>
          <h2>Every meal makes a difference.</h2>
        </div>

        <div className="impact-stats">

          <div className="home-stat">
            <div className="stat-icon">🥗</div>
            <div>
              <h2>{stats.totalDonations}</h2>
              <p>Food Donations</p>
            </div>
          </div>

          <div className="home-stat">
            <div className="stat-icon">✓</div>
            <div>
              <h2>{stats.totalDelivered}</h2>
              <p>Successful Deliveries</p>
            </div>
          </div>

          <div className="home-stat">
            <div className="stat-icon">♥</div>
            <div>
              <h2>{stats.mealsRescued}</h2>
              <p>Meals Rescued</p>
            </div>
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="workflow-section">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From surplus to shelter in four steps</h2>
          <p>
            A simple workflow designed to move edible food
            quickly from donors to people who need it.
          </p>
        </div>

        <div className="workflow">

          <div className="workflow-card">
            <div className="workflow-number">01</div>
            <div className="workflow-icon">🍱</div>
            <h3>Post Surplus</h3>
            <p>
              Add food type, quantity, expiry time and
              pickup location.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <div className="workflow-number">02</div>
            <div className="workflow-icon">⚡</div>
            <h3>Smart Match</h3>
            <p>
              The matching engine finds shelters based on
              food preference and current need.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <div className="workflow-number">03</div>
            <div className="workflow-icon">🚚</div>
            <h3>Pickup & Deliver</h3>
            <p>
              Volunteers track the donation from pickup
              through successful delivery.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <div className="workflow-number">04</div>
            <div className="workflow-icon">📊</div>
            <h3>Track Impact</h3>
            <p>
              Completed deliveries automatically contribute
              to the meals-rescued dashboard.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="home-cta">

        <div>
          <span>FOOD SHOULD FEED PEOPLE, NOT LANDFILLS.</span>

          <h2>
            Have surplus food available?
          </h2>

          <p>
            Post it in seconds and help it reach a shelter
            that needs it.
          </p>
        </div>

        <button onClick={() => navigate("/donate")}>
          Start a Food Rescue →
        </button>

      </section>

    </div>
  );
}

export default Home;