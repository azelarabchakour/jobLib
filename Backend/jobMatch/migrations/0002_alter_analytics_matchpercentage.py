# Generated by Django 5.0.3 on 2024-04-05 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobMatch', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analytics',
            name='matchPercentage',
            field=models.DecimalField(decimal_places=2, max_digits=4),
        ),
    ]