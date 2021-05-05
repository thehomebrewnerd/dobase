from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from django.db.models.functions import Lower

from .models import Task


@login_required(login_url='/accounts/login')
def view_tasks(request):
    """View for displaying task list for the logged in user"""
    work_tasks = Task.objects.filter(user=request.user, task_type=1).order_by('created_on')
    work_task_dict = {}
    for task in work_tasks:
        task_name = task.project_name
        goal_name = task.goal_name
        goal_dict = work_task_dict.get(task_name) or {}
        task_list = goal_dict.get(goal_name) or []
        task_list = task_list + [task]
        goal_dict[goal_name] = task_list
        work_task_dict[task_name] = goal_dict

    personal_tasks = Task.objects.filter(user=request.user, task_type=2).order_by('created_on')
    personal_task_dict = {}
    for task in personal_tasks:
        task_name = task.project_name
        goal_name = task.goal_name
        goal_dict = personal_task_dict.get(task_name) or {}
        task_list = goal_dict.get(goal_name) or []
        task_list = task_list + [task]
        goal_dict[goal_name] = task_list
        personal_task_dict[task_name] = goal_dict

    context = {'work_tasks': work_task_dict, 'personal_tasks': personal_task_dict}
    return render(request, 'task_list.html', context)


class TaskCreateView(LoginRequiredMixin, CreateView):
    model = Task
    fields = ['project_name', 'goal_name', 'task_description', 'task_owner', 'task_type']
    template_name = 'create_task.html'
    success_url = reverse_lazy('view-tasks')

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        

        # Maximum number of values to return for autocomplete
        MAX_AUTOCOMPLETE = 10

        # Get autocomplete values for work fields
        work_tasks = Task.objects.order_by('created_on').filter(user=self.request.user, task_type=1)
        work_projects = work_tasks.values_list('project_name', flat=True)
        work_goals = work_tasks.values_list('goal_name', flat=True)
        work_people = work_tasks.values_list('task_owner', flat=True)

        # Should probably update this to use .distinct() above, but this does not work with sqlite db
        # used for local testing
        auto_work_projects = []
        for project in work_projects:
            if project not in auto_work_projects:
                auto_work_projects.append(project)
            if len(auto_work_projects) >= MAX_AUTOCOMPLETE:
                break

        auto_work_goals = []
        for goal in work_goals:
            if goal not in auto_work_goals:
                auto_work_goals.append(goal)
            if len(auto_work_goals) >= MAX_AUTOCOMPLETE:
                break

        auto_work_people = []
        for person in work_people:
            if person is not None and person not in auto_work_people:
                auto_work_people.append(person)
            if len(auto_work_people) >= MAX_AUTOCOMPLETE:
                break

        context['auto_work_projects'] = sorted(auto_work_projects)
        context['auto_work_goals'] = sorted(auto_work_goals)
        context['auto_work_people'] = sorted(auto_work_people)

        # Get autocomplete values for personal fields
        personal_tasks = Task.objects.order_by('created_on').filter(user=self.request.user, task_type=2)
        personal_projects = personal_tasks.values_list('project_name', flat=True)
        personal_goals = personal_tasks.values_list('goal_name', flat=True)
        personal_people = personal_tasks.values_list('task_owner', flat=True)

        # Should probably update this to use .distinct() above, but this does not work with sqlite db
        # used for local testing
        auto_personal_projects = []
        for project in personal_projects:
            if project not in auto_personal_projects:
                auto_personal_projects.append(project)
            if len(auto_personal_projects) >= MAX_AUTOCOMPLETE:
                break

        auto_personal_goals = []
        for goal in personal_goals:
            if goal not in auto_personal_goals:
                auto_personal_goals.append(goal)
            if len(auto_personal_goals) >= MAX_AUTOCOMPLETE:
                break

        auto_personal_people = []
        for person in personal_people:
            if person is not None and person not in auto_personal_people:
                auto_personal_people.append(person)
            if len(auto_personal_people) >= MAX_AUTOCOMPLETE:
                break

        context['auto_personal_projects'] = sorted(auto_personal_projects)
        context['auto_personal_goals'] = sorted(auto_personal_goals)
        context['auto_personal_people'] = sorted(auto_personal_people)

        return context