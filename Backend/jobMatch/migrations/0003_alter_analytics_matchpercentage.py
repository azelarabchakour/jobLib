# Generated by Django 5.0.3 on 2024-04-05 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobMatch', '0002_alter_analytics_matchpercentage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analytics',
            name='matchPercentage',
            field=models.FloatField(),
        ),
    ]
