import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Locations.css";
import "../css/Tenants.css";
import axios from "axios";

const Locations = () => {
  const navigate = useNavigate();

  const [selectedApartment, setSelectedApartment] = useState("1");
  const [apartments, setApartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appartements")
      .then((response) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching apartments:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  // Set current month on component mount
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    setSelectedMonth(currentMonth);
  }, []);

  const months = [
    {
      key: `${new Date().getFullYear()}-01`,
      name: `Janvier ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-02`,
      name: `Février ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-03`,
      name: `Mars ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-04`,
      name: `Avril ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-05`,
      name: `Mai ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-06`,
      name: `Juin ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-07`,
      name: `Juillet ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-08`,
      name: `Aout ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-09`,
      name: `Septembre ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-10`,
      name: `Octobre ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-11`,
      name: `Novembre ${new Date().getFullYear()}`,
    },
    {
      key: `${new Date().getFullYear()}-12`,
      name: `Decembre ${new Date().getFullYear()}`,
    },
  ];

  const rentalData = {
    A101: {
      "2024-01": [
        {
          id: 1,
          tenant: "Ahmed Benali",
          rent: 3500,
          status: "pending",
          paymentDate: "2024-01-05",
          daysOccupied: [25, 26, 27, 28, 29, 30, 31],
          color: "#2ed573",
        },
      ],
      "2024-02": [
        {
          id: 1,
          tenant: "Ahmed Benali",
          rent: 3500,
          status: "paid",
          paymentDate: "2024-02-03",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
          ],
          color: "#2ed573",
        },
      ],
      "2024-03": [
        {
          id: 1,
          tenant: "Ahmed Benali",
          rent: 3500,
          status: "paid",
          paymentDate: "2024-03-02",
          daysOccupied: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          color: "#2ed573",
        },
        {
          id: 2,
          tenant: "Fatima Zahra",
          rent: 3800,
          status: "paid",
          paymentDate: "2024-03-16",
          daysOccupied: [
            16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          color: "#667eea",
        },
      ],
      "2024-04": [
        {
          id: 1,
          tenant: "Fatima Zahra",
          rent: 3800,
          status: "paid",
          paymentDate: "2024-04-01",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          ],
          color: "#667eea",
        },
      ],
      "2024-05": [
        {
          id: 1,
          tenant: "Fatima Zahra",
          rent: 3800,
          status: "paid",
          paymentDate: "2024-05-03",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          color: "#667eea",
        },
      ],
      "2024-06": [
        {
          id: 1,
          tenant: "Fatima Zahra",
          rent: 3800,
          status: "paid",
          paymentDate: "2024-06-01",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          ],
          color: "#667eea",
        },
      ],
    },
    A201: {
      "2024-01": [
        {
          id: 1,
          tenant: "Mohammed Alami",
          rent: 5800,
          status: "paid",
          paymentDate: "2024-01-04",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          color: "#ffa502",
        },
      ],
      "2024-02": [
        {
          id: 1,
          tenant: "Mohammed Alami",
          rent: 5800,
          status: "paid",
          paymentDate: "2024-02-02",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
          ],
          color: "#ffa502",
        },
      ],
      "2024-03": [
        {
          id: 1,
          tenant: "Mohammed Alami",
          rent: 5800,
          status: "paid",
          paymentDate: "2024-03-01",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          color: "#ffa502",
        },
      ],
      "2024-04": [
        {
          id: 1,
          tenant: "Amina Tazi",
          rent: 6200,
          status: "paid",
          paymentDate: "2024-04-01",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          ],
          color: "#9c27b0",
        },
      ],
      "2024-05": [
        {
          id: 1,
          tenant: "Amina Tazi",
          rent: 6200,
          status: "paid",
          paymentDate: "2024-05-02",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          color: "#9c27b0",
        },
      ],
      "2024-06": [
        {
          id: 1,
          tenant: "Amina Tazi",
          rent: 6200,
          status: "paid",
          paymentDate: "2024-06-01",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          ],
          color: "#9c27b0",
        },
      ],
    },
    A301: {
      "2024-01": [
        {
          id: 1,
          tenant: "Karim Benjelloun",
          rent: 4500,
          status: "paid",
          paymentDate: "2024-01-06",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          color: "#2196F3",
        },
      ],
      "2024-02": [
        {
          id: 1,
          tenant: "Karim Benjelloun",
          rent: 4500,
          status: "paid",
          paymentDate: "2024-02-04",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
          ],
          color: "#2196F3",
        },
      ],
      "2024-03": [
        {
          id: 1,
          tenant: "Karim Benjelloun",
          rent: 4500,
          status: "paid",
          paymentDate: "2024-03-03",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          color: "#2196F3",
        },
      ],
      "2024-04": [
        {
          id: 1,
          tenant: "Karim Benjelloun",
          rent: 4500,
          status: "paid",
          paymentDate: "2024-04-02",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          ],
          color: "#2196F3",
        },
      ],
      "2024-05": [
        {
          id: 1,
          tenant: "Karim Benjelloun",
          rent: 4500,
          status: "paid",
          paymentDate: "2024-05-04",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
          color: "#2196F3",
        },
      ],
      "2024-06": [
        {
          id: 1,
          tenant: "Karim Benjelloun",
          rent: 4500,
          status: "paid",
          paymentDate: "2024-06-02",
          daysOccupied: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          ],
          color: "#2196F3",
        },
      ],
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "#2ed573";

      case "overdue":
        return "#ff4757";
      default:
        return "#ffa502";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Payé";

      case "overdue":
        return "En retard";
      default:
        return "En attente";
    }
  };

  const renderCalendar = (monthKey) => {
    const [year, month] = monthKey.split("-");
    const currentMonth = parseInt(month);
    const currentYear = parseInt(year);

    // Filter locations for the selected month and apartment
    const monthLocations = locations.filter((location) => {
      const entryDate = new Date(location.dateEntree);
      const exitDate = new Date(location.dateSortie);
      const locationMonth = entryDate.getMonth() + 1;
      const locationYear = entryDate.getFullYear();

      return (
        location.appartement?.appt === selectedApartment &&
        locationMonth === currentMonth &&
        locationYear === currentYear
      );
    });

    const getDayLocation = (day) => {
      return monthLocations.find((location) => {
        const entryDate = new Date(location.dateEntree);
        const exitDate = new Date(location.dateSortie);
        const checkDate = new Date(currentYear, currentMonth - 1, day);

        return checkDate > entryDate && checkDate <= exitDate;
      });
    };

    // Get the first day of the month and calculate the starting day of the week
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get the number of days in the month
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Create calendar grid with proper day alignment
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push({ day: null, isCurrentMonth: false });
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ day, isCurrentMonth: true });
    }

    return (
      <div className="calendar-content">
        {monthLocations.length > 0 && (
          <div className="rentals-summary">
            {monthLocations.map((location, index) => (
              <div
                key={location.id}
                className="rental-summary-item"
                style={{ borderLeftColor: location.color || "#4CAF50" }}
              >
                <div className="rental-summary-header">
                  <span className="rental-tenant">
                    {location.locataire?.nom || "Locataire inconnu"}
                  </span>
                  <span className="rental-amount">
                    {location.prixParJour} DH/Jour
                  </span>
                </div>
                <div className="rental-summary-details">
                  <span
                    className="rental-status"
                    style={{ backgroundColor: getStatusColor(location.status) }}
                  >
                    {getStatusText(location.status)}
                  </span>
                  <span className="rental-period">
                    {new Date(location.dateEntree).toLocaleDateString()} -{" "}
                    {new Date(location.dateSortie).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="calendar-container">
          <div className="calendar-header">
            <div className="day-header">Dim</div>
            <div className="day-header">Lun</div>
            <div className="day-header">Mar</div>
            <div className="day-header">Mer</div>
            <div className="day-header">Jeu</div>
            <div className="day-header">Ven</div>
            <div className="day-header">Sam</div>
          </div>

          <div className="calendar-grid">
            {calendarDays.map(({ day, isCurrentMonth }, index) => {
              if (!isCurrentMonth) {
                return (
                  <div key={`empty-${index}`} className="calendar-day empty">
                    <span className="day-number"></span>
                  </div>
                );
              }

              const dayLocation = getDayLocation(day);
              return (
                <div
                  key={day}
                  className={`calendar-day ${dayLocation ? "occupied" : ""}`}
                  style={{
                    backgroundColor: dayLocation
                      ? dayLocation.color || "#4CAF50"
                      : "white",
                    color: dayLocation ? "white" : "#666",
                  }}
                >
                  <span className="day-number">{day}</span>
                  {dayLocation && (
                    <div className="day-tenant-info">
                      <span className="day-tenant-name">
                        {dayLocation.locataire?.nom || "Locataire inconnu"}
                      </span>
                      <span className="day-rent-amount">
                        {dayLocation.prixParJour} DH/Jour
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="locations">
      <div className="locations-header">
        <h1>Locations</h1>
        <p>Suivi des paiements de loyer par mois</p>
      </div>

      <div className="apartments-navbar">
        <div className="navbar-container">
          {apartments.map((apartment) => (
            <button
              key={apartment.appt}
              className={`nav-item ${
                selectedApartment === apartment.appt ? "active" : ""
              }`}
              onClick={() => setSelectedApartment(apartment.appt)}
            >
              <span
                className="apartment-number"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                A {apartment.appt}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="locations-content">
        <div className="month-index">
          <h3>Mois</h3>
          <div className="month-list">
            {months.map((month) => (
              <button
                key={month.key}
                className={`month-item ${
                  selectedMonth === month.key ? "active" : ""
                }`}
                onClick={() => setSelectedMonth(month.key)}
              >
                {month.name}
              </button>
            ))}
          </div>
        </div>

        <div className="calendar-section">
          {selectedMonth && (
            <div className="month-card">
              <div className="month-header">
                <h3>{months.find((m) => m.key === selectedMonth)?.name}</h3>
                <button
                  className="add-tenant-btn"
                  onClick={() => navigate("/add-location")}
                >
                  + Ajouter un courtier
                </button>
              </div>

              <div className="month-content">
                {renderCalendar(selectedMonth)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Locations;
