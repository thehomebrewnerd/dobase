from django.contrib import admin
from .models import Task

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ('project_name', 'goal_name', 'task_description', 'task_type', 'user', 'created_on',)

admin.site.register(Task, TaskAdmin)