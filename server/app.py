from config import app, api
from models import *
from routes import Signup, Login, Logout, UserProfile, GoogleLogin, GoogleAuthorize, TokenRefresh, DeleteUser, UserStats
# DeleteUser
from routes.journalsroute import JournalsResource, JournalResource
from routes.entriesroute import EntryResource, AiPromptResource,CustomAiPromptResource, JournalEntriesResource
from routes.moodsroute import MoodsResource

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(GoogleLogin, "/login/google")
api.add_resource(GoogleAuthorize, "/authorize", endpoint="googleauthorize")
api.add_resource(UserProfile, '/user/profile')
api.add_resource(UserStats, '/user/stats')
api.add_resource(DeleteUser, '/user/delete')

api.add_resource(JournalsResource, '/journals')
api.add_resource(JournalResource, '/journals/<int:journal_id>')

api.add_resource(EntryResource, '/entries', '/entries/<int:entry_id>')
api.add_resource(JournalEntriesResource, '/journals/<int:journal_id>/entries')

api.add_resource(AiPromptResource, '/ai-prompt')
api.add_resource(CustomAiPromptResource, '/ai-prompt/custom')

api.add_resource(MoodsResource, '/moods')
api.add_resource(TokenRefresh, '/api/refresh-token')


if __name__ == "__main__":
  app.run(port=5000, debug=True)
