# Generated by Django 5.0.3 on 2024-04-26 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobMatch', '0005_analytics_appliedornot_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplication',
            name='applicationStatus',
            field=models.CharField(choices=[('APPLIED', 'Applied'), ('ACCEPTED', 'accepted'), ('REFUSED', 'refused'), ('TAKEN', 'Taken by other Employee'), ('CANCELED', 'Job is canceled or deleted by the Employer')], max_length=255),
        ),
    ]
