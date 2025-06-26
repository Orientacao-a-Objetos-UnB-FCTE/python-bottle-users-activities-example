from bottle import request
from models.user import UserModel, User
from models.activity import ActivityModel

class UserService:
    def __init__(self):
        self.user_model = UserModel()
        self.activity_model = ActivityModel()
    
    def get_all(self):
        users = self.user_model.get_all()
        activities = self.activity_model.get_all()
        activity_dict = {a.id: a for a in activities}

        # Para cada usuário, cria uma lista com nomes das atividades já resolvidos
        for user in users:
            user.activity_names = [
                activity_dict[aid].name if aid in activity_dict else 'Desconhecida'
                for aid in user.activities
            ]
        
        return users

    def save(self):
        last_id = max([u.id for u in self.user_model.get_all()], default=0)
        new_id = last_id + 1
        name = request.forms.get('name')
        email = request.forms.get('email')
        birthdate = request.forms.get('birthdate')
        activities_selected = request.forms.getall('activities')
        activities_ids = list(map(int, activities_selected)) if activities_selected else []

        user = User(id=new_id, name=name, email=email, birthdate=birthdate, activities=activities_ids)
        self.user_model.add_user(user)

    def get_by_id(self, user_id):
        return self.user_model.get_by_id(user_id)

    def edit_user(self, user):
        name = request.forms.get('name')
        email = request.forms.get('email')
        birthdate = request.forms.get('birthdate')
        activities_selected = request.forms.getall('activities')
        activities_ids = list(map(int, activities_selected)) if activities_selected else []

        user.name = name
        user.email = email
        user.birthdate = birthdate
        user.activities = activities_ids

        self.user_model.update_user(user)
    
    def delete_user(self, user_id):
        self.user_model.delete_user(user_id)

