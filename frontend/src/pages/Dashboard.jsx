import { useEffect, useState } from "react";
import { API_URL } from "../config";

function Dashboard() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDelivered: 0,
    mealsRescued: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/dashboard`
        );

        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.log("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const successRate =
    stats.totalDonations > 0
      ? Math.round(
          (stats.totalDelivered / stats.totalDonations) * 100
        )
      : 0;

  if (loading) {
    return (
      <div className="impact-loading">
        Loading impact data...
      </div>
    );
  }

  return (
    <div className="impact-page">

      {/* HEADER */}

      <section className="impact-header">

        <div>
          <span className="portal-tag">
            LIVE IMPACT
          </span>

          <h1>Impact Dashboard</h1>

          <p>
            Track how surplus food moves from donation
            to successful delivery and measurable impact.
          </p>
        </div>

        <div className="impact-live-status">
          <span className="status-dot"></span>
          Live data
        </div>

      </section>


      {/* HERO IMPACT */}

      <section className="impact-hero">

        <div className="impact-hero-content">

          <span className="impact-eyebrow">
            TOTAL SOCIAL IMPACT
          </span>

          <div className="big-impact-number">
            {stats.mealsRescued}
          </div>

          <h2>Meals Successfully Rescued</h2>

          <p>
            These meals represent donations that completed
            the full rescue journey and were successfully
            delivered.
          </p>

          <div className="impact-proof">
            <span>✓</span>

            <p>
              Only completed deliveries are counted as
              rescued meals.
            </p>
          </div>

        </div>


        {/* VISUAL */}

        <div className="impact-visual">

          <div className="impact-ring">

            <div className="ring-inner">
              <span>{successRate}%</span>
              <small>
                Delivery
                <br />
                Rate
              </small>
            </div>

          </div>

          <div className="impact-visual-caption">
            <span className="status-dot"></span>
            Based on completed donations
          </div>

        </div>

      </section>


      {/* STAT CARDS */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">
              🍱
            </div>

            <span>DONATIONS</span>

          </div>

          <h2>{stats.totalDonations}</h2>

          <h3>Total Food Donations</h3>

          <p>
            Surplus food donations posted through the
            platform.
          </p>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon delivery-icon">
              ✓
            </div>

            <span>DELIVERIES</span>

          </div>

          <h2>{stats.totalDelivered}</h2>

          <h3>Successful Deliveries</h3>

          <p>
            Donations that reached their matched
            shelter successfully.
          </p>

        </div>


        <div className="dashboard-stat-card featured-stat">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon meal-icon">
              ♥
            </div>

            <span>MEALS RESCUED</span>

          </div>

          <h2>{stats.mealsRescued}</h2>

          <h3>Meals Saved From Waste</h3>

          <p>
            Meals successfully transferred from surplus
            sources to shelters.
          </p>

        </div>

      </section>


      {/* RESCUE JOURNEY */}

      <section className="impact-journey">

        <div className="journey-heading">

          <div>
            <span className="portal-tag">
              RESCUE JOURNEY
            </span>

            <h2>
              How a donation becomes impact
            </h2>
          </div>

          <p>
            Impact is recorded only after food completes
            the full rescue lifecycle.
          </p>

        </div>


        <div className="journey-flow">

          <div className="journey-step">
            <div className="journey-circle">
              🍱
            </div>

            <span>01</span>
            <h3>Posted</h3>
            <p>Surplus food is listed.</p>
          </div>


          <div className="journey-connector">
            <span>→</span>
          </div>


          <div className="journey-step">
            <div className="journey-circle">
              ⚡
            </div>

            <span>02</span>
            <h3>Matched</h3>
            <p>A suitable shelter is found.</p>
          </div>


          <div className="journey-connector">
            <span>→</span>
          </div>


          <div className="journey-step">
            <div className="journey-circle">
              🚚
            </div>

            <span>03</span>
            <h3>Picked Up</h3>
            <p>Food begins its journey.</p>
          </div>


          <div className="journey-connector">
            <span>→</span>
          </div>


          <div className="journey-step completed-step">
            <div className="journey-circle">
              ✓
            </div>

            <span>04</span>
            <h3>Delivered</h3>
            <p>Meals count toward impact.</p>
          </div>

        </div>

      </section>


      {/* BOTTOM MESSAGE */}

      <section className="impact-message">

        <div className="impact-message-icon">
          🌱
        </div>

        <div>
          <span>WHY IT MATTERS</span>

          <h2>
            Food rescued is food put back to purpose.
          </h2>

          <p>
            Every successful delivery connects available
            surplus with an organization that currently
            needs it.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;