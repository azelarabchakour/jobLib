# Generated by Django 5.0.3 on 2024-05-12 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employer', '0010_jobposting_jobdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobposting',
            name='jobDate',
            field=models.DateField(auto_now_add=True),
        ),
    ]
