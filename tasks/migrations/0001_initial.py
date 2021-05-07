# Generated by Django 3.0.8 on 2021-05-04 12:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=512, verbose_name='Project')),
                ('goal_name', models.CharField(max_length=512, verbose_name='Goal')),
                ('task_description', models.TextField(verbose_name='Task')),
                ('task_owner', models.CharField(max_length=128, verbose_name='Who')),
                ('task_type', models.IntegerField(choices=[(1, 'Business'), (2, 'Personal')], default=1, verbose_name='Task Type')),
                ('is_complete', models.BooleanField(default=False, verbose_name='Status')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]