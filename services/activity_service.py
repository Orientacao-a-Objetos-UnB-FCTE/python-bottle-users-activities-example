from bottle import request
from models.activity import ActivityModel, Activity
from models.activity import ActivityModel

class ActivityService:
    def __init__(self):
        self.activity_model = ActivityModel()
    
    def get_all(self):
        activities = self.activity_model.get_all()
        return activities
    
    def save(self):
        last_id = max([a.id for a in self.activity_model.get_all()], default=0)
        new_id = last_id + 1
        name = request.forms.get('name')
        description = request.forms.get('description')
        done = bool(request.forms.get('done'))

        activity = Activity(id=new_id, name=name, description=description, done=done)
        self.activity_model.add_activity(activity)
    
    def get_by_id(self, activity_id):
        return self.activity_model.get_by_id(activity_id)

    def edit_activity(self, activity):
        name = request.forms.get('name')
        description = request.forms.get('description')
        done = bool(request.forms.get('done'))

        activity.name = name
        activity.description = description
        activity.done = done

        self.activity_model.update_activity(activity)
    
    def delete_activity(self, activity_id):
        self.activity_model.delete_activity(activity_id)
