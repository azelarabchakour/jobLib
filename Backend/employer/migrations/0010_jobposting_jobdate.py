# Generated by Django 5.0.3 on 2024-05-12 14:22

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employer', '0009_alter_jobposting_companyname'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobposting',
            name='jobDate',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]