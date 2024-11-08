# Generated by Django 5.0.3 on 2024-05-11 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employer', '0006_jobposting_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobposting',
            name='jobStatus',
            field=models.CharField(choices=[('POSTED', 'Posted'), ('DONE', 'Done'), ('CANCELED', 'Canceled')], default='POSTED', max_length=255),
        ),
        migrations.AlterField(
            model_name='jobposting',
            name='level',
            field=models.CharField(choices=[('JUNIOR', 'Entry'), ('INTERMEDIATE', 'Intermediate'), ('SENIOR', 'Senior'), ('EXPERT', 'Expert')], default='ENTRY', max_length=255),
        ),
    ]
