# Generated by Django 5.0.3 on 2024-04-07 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employer', '0002_alter_jobposting_jobstatus_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobposting',
            name='jobStatus',
            field=models.CharField(choices=[('POSTED', 'Posted'), ('DONE', 'Done'), ('CANCELED', 'Canceled')], max_length=255),
        ),
    ]