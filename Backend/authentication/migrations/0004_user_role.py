# Generated by Django 5.0.3 on 2024-05-11 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_user_first_name_user_last_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.IntegerField(choices=[(0, 'Employee'), (1, 'Employer')], default=0),
        ),
    ]
