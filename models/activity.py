import json
import os
from dataclasses import dataclass, asdict

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

class Activity:
    def __init__(self, id, name, description, done):
        self.id = id
        self.name = name
        self.description = description
        self.done = done

    def __repr__(self):
        return (f"Activity(id={self.id}, name='{self.name}', "
                f"description='{self.description}', done={self.done})")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'done': self.done
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            id=data['id'],
            name=data['name'],
            description=data['description'],
            done=data['done']
        )


class ActivityModel:
    FILE_PATH = os.path.join(DATA_DIR, 'activities.json')

    def __init__(self):
        self.activities = self._load()

    def _load(self):
        if not os.path.exists(self.FILE_PATH):
            return []
        with open(self.FILE_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return [Activity(**item) for item in data]

    def _save(self):
        with open(self.FILE_PATH, 'w', encoding='utf-8') as f:
            json.dump([a.to_dict() for a in self.activities], f, indent=4, ensure_ascii=False)

    def get_all(self):
        return self.activities

    def get_by_id(self, activity_id: int):
        return next((a for a in self.activities if a.id == activity_id), None)

    def add_activity(self, activity: Activity):
        self.activities.append(activity)
        self._save()

    def update_activity(self, updated_activity: Activity):
        for i, a in enumerate(self.activities):
            if a.id == updated_activity.id:
                self.activities[i] = updated_activity
                self._save()
                break

    def delete_activity(self, activity_id: int):
        self.activities = [a for a in self.activities if a.id != activity_id]
        self._save()
