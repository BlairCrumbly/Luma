# Luma - Guided Journaling Web App
## Write, reflect, and heal –find your inner glow 🌱

Luma is a **guided journaling app** designed to help users find clarity through self-reflection. It offers a **structured journaling experience** with **AI-generated prompts** and mood tracking, helping individuals who may not have access to professional mental health resources. Users can track their emotions over time, create personalized journals, and dive into meaningful writing.

## Features

- **User Authentication**: Secure sign-up, login, and logout functionality.
- **Create & Manage Journals**: Users can create, update, and delete journals to organize their writing.
- **Journal Entries**: Create, view, edit, and delete journal entries with customizable titles and main text.
- **Mood Tracking**: Assign moods to journal entries using clickable emoji buttons.
- **AI-generated Prompts**: Get writing prompts based on AI when users are unsure of what to write about.
- **Time Stamping**: Each journal entry is timestamped when saved to track writing over time.
- **Responsive Design**: Mobile-friendly layout for users to access the app on any device.

## Demo

![Demo GIF](link-to-your-demo.gif)  
*Coming Soon...*

## Technologies Used

- **Backend**: Flask, SQLAlchemy, Flask-JWT-Extended
- **Frontend**: React, React Router, Context API
- **Database**: SQLite3
- **Styling**: CSS, Styled Components
- **Authentication**: JWT tokens for secure login and user sessions
- **AI Integration**: Using AI prompts for journaling suggestions

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Luma.git
cd Luma
```

### 2. Set up the backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables for secret keys and database configurations.
   - Create a `.env` file and add:
     ```
     DATABASE_URL=your-database-url
     JWT_SECRET_KEY=your-secret-key
     ```
4. Migrate the database:
   ```bash
   flask db upgrade
   ```
5. Run the Flask backend server:
   ```bash
   flask run
   ```

### 3. Set up the frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React development server:
   ```bash
   npm start
   ```

## Stretch Goals

1. **HeatMap Calendar View** – Visualize user data over time, with color-coded intensity to highlight trends and patterns.
2. **Mood Trend Graph** – Track mood patterns over time, showing highs & lows.
3. **Voice Entry Option** – Allow users to dictate their journal entries.
4. **Tagging System** – Users can tag entries with custom labels.

## External Packages

- **Flask** – Web framework (Backend)
- **Flask-SQLAlchemy** – ORM for database interactions
- **Flask-JWT-Extended** – User authentication with JWT tokens
- **React Router** – Frontend routing
- **React Context API** – State management
- **Fetch API** – Handling HTTP requests (instead of Axios)
- **Chart.js** – Mood trend visualization (stretch goal)
- **Date-fns** – Date formatting in frontend
- **better-profanity** – Profanity filtering
- **React Quill** – Rich text editor for user input


## Contributing

Feel free to fork this project and submit pull requests. You can also open issues if you find bugs or want to request new features!

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **OpenAI GPT-3** for providing AI-powered prompts
- **Flask Documentation** and **React Docs** for guidance throughout development
- **Mental Health Community** for inspiring this project <3

