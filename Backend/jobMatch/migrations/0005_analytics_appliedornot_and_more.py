# Generated by Django 5.0.3 on 2024-04-07 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobMatch', '0004_jobapplication_matchpercentage'),
    ]

    operations = [
        migrations.AddField(
            model_name='analytics',
            name='appliedOrNot',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='jobapplication',
            name='applicationStatus',
            field=models.CharField(choices=[('APPLIED', 'Applied'), ('ACCEPTED', 'accepted'), ('REFUSED', 'refused'), ('TAKEN', 'Taken by other Employee'), ('CANCELED', 'got the job')], max_length=255),
        ),
    ]