# Generated by Django 3.0.8 on 2021-05-04 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='is_complete',
            field=models.BooleanField(default=False, verbose_name='Is Complete?'),
        ),
        migrations.AlterField(
            model_name='task',
            name='task_owner',
            field=models.CharField(blank=True, default='Me', max_length=128, null=True, verbose_name='Who (Defaults to Me)'),
        ),
    ]
