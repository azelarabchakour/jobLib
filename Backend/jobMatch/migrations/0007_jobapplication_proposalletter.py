# Generated by Django 5.0.3 on 2024-04-30 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobMatch', '0006_alter_jobapplication_applicationstatus'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplication',
            name='proposalLetter',
            field=models.CharField(max_length=500, null=True),
        ),
    ]