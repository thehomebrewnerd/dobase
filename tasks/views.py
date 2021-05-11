from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from django.db.models.functions import Lower
from django.http import JsonResponse

from .models import Task


@login_required(login_url='/accounts/login')
def view_tasks(request, task_filter=None):
    """View for displaying task list for the logged in user"""
    full_tasks = Task.objects.filter(user=request.user, is_complete=False).order_by('created_on')
    task_filter = request.GET.get('filter', None)
    if task_filter == 'others':
        owners = set()
        for task in full_tasks:
            if task.task_owner is not None:
                owners.add(task.task_owner)
        owners = sorted(list(owners))
    else:
        owners = ["Me"]

    work_dict = {}
    personal_dict = {}
    for owner in owners:
        query_owner = owner
        if owner == "Me":
            query_owner = None
        work_tasks_for_owner = full_tasks.filter(task_type=1, task_owner=query_owner)
        work_task_dict = {}
        for task in work_tasks_for_owner:
            task_name = task.project_name
            goal_name = task.goal_name
            goal_dict = work_task_dict.get(task_name) or {}
            task_list = goal_dict.get(goal_name) or []
            task_list = task_list + [task]
            goal_dict[goal_name] = task_list
            work_task_dict[task_name] = goal_dict
        if len(work_task_dict) > 0:
            work_dict[owner] = work_task_dict

        personal_tasks_for_owner = full_tasks.filter(task_type=2, task_owner=query_owner)
        personal_task_dict = {}
        for task in personal_tasks_for_owner:
            task_name = task.project_name
            goal_name = task.goal_name
            goal_dict = personal_task_dict.get(task_name) or {}
            task_list = goal_dict.get(goal_name) or []
            task_list = task_list + [task]
            goal_dict[goal_name] = task_list
            personal_task_dict[task_name] = goal_dict
        if len(personal_task_dict) > 0:
            personal_dict[owner] = personal_task_dict

    context = {'work_tasks_by_person': work_dict, 'personal_tasks_by_person': personal_dict}
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


@login_required(login_url='/accounts/login')
def update_task_status(request):
    if request.method == "POST":
        user = request.user
        task_id = request.POST.get('id')
        status = request.POST.get('status')
        task = get_object_or_404(Task, pk=task_id)

        if status == '1':
            task.is_complete = True
        else:
            task.is_complete = False
        
        task.save()

        return JsonResponse({"message": "task updated successfully"})
    else:
        return JsonResponse({"nothing to see": "this isn't happening"})
