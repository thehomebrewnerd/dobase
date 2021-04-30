from django.shortcuts import render


def view_tasks(request):
    """View for displaying task list for the logged in user"""
    context = {}
    return render(request, 'task_list.html', context)


def create_task(request):
    """View for displaying form for adding a new task for the logged in user"""
    context = {}
    return render(request, 'create_task.html', context)
