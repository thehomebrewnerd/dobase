"""dobase URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from tasks.views import TaskCreateView, view_tasks, view_tasks_by_date, update_task_status, archive_task
from users.views import create_account

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', TaskCreateView.as_view(), name='home'),
    path('tasks/', view_tasks, name='view-tasks'),
    path('tasks/date/', view_tasks_by_date, name='view-tasks-date'),
    path('signup/', create_account, name='signup'),
    path('tasks/update_task_status', update_task_status, name='update_task_status'),
    path('tasks/archive_task', archive_task, name='archive_task')
]
