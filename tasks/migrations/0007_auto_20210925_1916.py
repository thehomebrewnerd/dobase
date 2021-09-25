# Generated by Django 3.0.8 on 2021-09-25 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0006_auto_20210527_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='goal_name',
            field=models.CharField(max_length=512, verbose_name='Goal'),
        ),
        migrations.AlterField(
            model_name='task',
            name='task_description',
            field=models.TextField(verbose_name='Task'),
        ),
    ]