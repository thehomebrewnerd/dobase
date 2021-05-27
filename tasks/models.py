from django.db import models
from django.conf import settings


class Task(models.Model):
    class TaskTypeChoices(models.IntegerChoices):
        BUSINESS = 1
        PERSONAL = 2
    
    project_name = models.CharField("Project", max_length=512)
    goal_name = models.CharField("Subcategory", max_length=512)
    task_description = models.TextField("Action")
    task_owner = models.CharField("Who (Defaults to Me)", max_length=128, blank=True, null=True)
    task_type = models.IntegerField("Task Type",
                                    choices=TaskTypeChoices.choices,
                                    default=TaskTypeChoices.BUSINESS)
    is_complete = models.BooleanField("Is Complete?", default=False)
    is_archived = models.BooleanField("Is Archived?", default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def clean(self):
        self.project_name = self.project_name.title()
        self.goal_name = self.goal_name.title()
        if self.task_owner is not None:
            self.task_owner = self.task_owner.title()
