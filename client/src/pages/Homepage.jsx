import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/contexts/AuthContext';
import { api } from '../services/api';
import JournalCard from '../components/JournalCard/JournalCard';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/Homepage.css';


const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [recentJournals, setRecentJournals] = useState([]);
  const [latestEntries, setLatestEntries] = useState([]);
  const [entriesHeatmap, setEntriesHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for current month view
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch journals - handle 404 or other errors
        try {
          const journalsData = await api.get('/journals');
          // Sort by ID and take 5
          const sortedJournals = journalsData.sort((a, b) => b.id - a.id).slice(0, 4);
          setRecentJournals(sortedJournals);
        } catch (journalErr) {
          console.log('Could not load journals, possibly a new user', journalErr);
          setRecentJournals([]);
        }

        // Fetch entries - handle 404 or other errors
        try {
          const entriesData = await api.get('/entries');
          // Sort by creation date and take 4 most recent
          const recentEntries = entriesData
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 4);
          setLatestEntries(recentEntries);

          // Process entries for heatmap
          const entryDates = entriesData.reduce((acc, entry) => {
            const date = entry.created_at.split('T')[0]; // Get YYYY-MM-DD format
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});

          const heatmapData = Object.keys(entryDates).map(date => ({
            date,
            count: entryDates[date]
          }));

          setEntriesHeatmap(heatmapData);
        } catch (entriesErr) {
          console.log('Could not load entries, possibly a new user', entriesErr);
          setLatestEntries([]);
          setEntriesHeatmap([]);
        }
      } catch (err) {
        console.error('Error in fetchHomeData:', err);
        // Set empty arrays to ensure the page still renders
        setRecentJournals([]);
        setLatestEntries([]);
        setEntriesHeatmap([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  const handleJournalClick = (journalId) => {
    // Navigate to journal entries
    window.location.href = `/journal/${journalId}/entries`;
  };

  // Function to format month name
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (loading) return <div className="loading">Loading your dashboard...</div>;

  // If user is not logged in, show a welcome message


  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Welcome, {currentUser?.username || 'there'}!</h1>
        <p className="subtitle">Your journaling dashboard</p>
      </div>

      <div className="homepage-section">
        <div className="section-header">
          <h2>Your Journals</h2>
          <Link to="/journals" className="view-all-link">View All</Link>
        </div>
        
        <div className="journals-row">
          {recentJournals.length === 0 ? (
            <div className="no-data-message">
              <p>You don't have any journals yet.</p>
              <p>Create your first journal to start organizing your thoughts!</p>
              <Link to="/journals/new" className="create-button">Create Your First Journal</Link>
            </div>
          ) : (
            <>
              {recentJournals.map(journal => (
                <JournalCard 
                  key={journal.id} 
                  journal={journal} 
                  onClick={handleJournalClick}
                />
              ))}
              <Link to="/journals/new" className="add-journal-card">
                <div className="add-icon">+</div>
                <div>New Journal</div>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="homepage-section">
        <div className="section-header">
          <h2>Latest Entries</h2>
          <Link to="/entries" className="view-all-link">View All</Link>
        </div>
        
        <div className="entries-grid">
          {latestEntries.length === 0 ? (
            <div className="no-data-message">
              <p>You haven't written any entries yet.</p>
              <p>Start documenting your thoughts, feelings, and experiences today!</p>
              <Link to="/journal/new-entry" className="create-button">Write Your First Entry</Link>
            </div>
          ) : (
            latestEntries.map(entry => (
              <Link to={`/entry/${entry.id}`} key={entry.id} className="entry-card">
                <h3>{entry.title}</h3>
                <div className="entry-preview">
                  {entry.main_text.length > 100 
                    ? `${entry.main_text.substring(0, 100).replace(/<[^>]*>/g, '')}...`
                    : entry.main_text.replace(/<[^>]*>/g, '')}
                </div>
                <div className="entry-footer">
                  <span className="entry-date">{formatDate(entry.created_at)}</span>
                  <div className="entry-moods">
                    {entry.moods && entry.moods.map(mood => (
                      <span key={mood.id} className="mood-emoji">{mood.emoji}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="homepage-section">
        <div className="section-header">
          <h2>Your Writing Activity</h2>
        </div>
        
        {entriesHeatmap.length === 0 ? (
          <div className="no-data-message">
            <p>No writing activity to display yet.</p>
            <p>Regular journaling helps build a meaningful record of your journey.</p>
            <Link to="/journal/new-entry" className="create-button">Start Writing Today</Link>
          </div>
        ) : (
          <div className="heatmap-container">
            <CalendarHeatmap
              startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
              endDate={new Date()}
              values={entriesHeatmap}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-scale-${Math.min(value.count, 4)}`;
              }}
              tooltipDataAttrs={(value) => {
                if (!value || !value.date) {
                  return null;
                }
                return {
                  'data-tip': `${value.date}: ${value.count} entries`,
                };
              }}
            />
          </div>
        )}
      </div>
      
      {recentJournals.length === 0 && latestEntries.length === 0 && (
        <div className="getting-started-section">
          <h2>Getting Started</h2>
          <div className="getting-started-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create a Journal</h3>
              <p>Journals help you organize your entries by themes or purposes</p>
              <Link to="/journals/new" className="step-button">Create Journal</Link>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Write Your First Entry</h3>
              <p>Express your thoughts, feelings, and experiences</p>
              <Link to="/new-entry" className="step-button">Write Entry</Link>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Build a Routine</h3>
              <p>Write, reflect, and heal –find your inner glow</p>
              
              <img class="icon-container" src="../../images/idea-icon.png" alt="lightbulb with brain in it icon" />
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;