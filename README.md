# Luma - Guided Journaling Web App
## Write, reflect, and heal –find your inner glow 🌱

Luma is a **guided journaling app** designed to help users find clarity through self-reflection. It offers a **structured journaling experience** with **AI-generated prompts** and mood tracking, helping individuals who may not have access to professional mental health resources. Users can track their emotions over time, create personalized journals, and dive into meaningful writing.

## Features

- **User Authentication**: Secure sign-up, login, and logout functionality also available through **Google Oauth**
- **AI-generated Prompts**: Get AI writing prompts absed on your mood and keywords when users are unsure of what to write about.
- **Create & Manage Journals**: Users can create, update, and delete journals to organize their writing.
- **Journal Entries**: Create, view, edit, and delete journal entries with customizable titles and main text.
- **Mood Tracking**: Assign moods to journal entries using clickable emoji buttons and see your weekly mood trends.
- **Time Stamping**: Each journal entry is timestamped when saved to track writing over time.
- **Responsive Design**: Mobile-friendly layout for users to access the app on any device.

## Demo

![Demo GIF](Luma-showcase.gif)  


## Technologies Used

- **Backend**: Flask, SQLAlchemy, Flask-JWT-Extended
- **Frontend**: React, React Router, Context API
- **Database**: SQLite3
- **Styling**: CSS, Styled Components, lucide
- **Authentication**: JWT tokens for secure login and user sessions
- **AI Integration**: Using AI prompts for thought provoking journaling suggestions

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Luma.git
cd Luma
```

### 2. Set up the backend
1. Navigate to the backend directory:
   ```bash
   cd server
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
   python app.py
   ```

### 3. Set up the frontend
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React development server:
   ```bash
   npm run dev
   ```

## Stretch Goals

1. **Voice Entry Option** – Allow users to dictate their journal entries.
2. **More to add in editor** – Allow users to add music clips, pictures, etc.
3. **Social** – Public/Private journals and entries. Follower/Following relationships!
4. **Theme customization** - Customize your website theme
 

## External Packages

- **Flask** – Web framework (Backend)
- **Flask-SQLAlchemy** – ORM for database interactions
- **Flask-JWT-Extended** – User authentication with JWT tokens
- **React Router** – Frontend routing
- **React Context API** – State management
- **Fetch API** – Handling HTTP requests 
- **Chart.js** – Mood trend visualization
- **Date-fns** – Date formatting in frontend
- **React Quill** – Rich text editor for user input
- **Toaster** - Cleaner notifications
- **Lucide** - Icons


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

- **WriteCream** for providing AI-powered prompts
- **Flask Documentation** and **React Docs** for guidance throughout development
- **Mental Health Community** for inspiring this project 💕

