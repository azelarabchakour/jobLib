# Generated by Django 5.0.3 on 2024-03-17 23:47

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Employer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact_info', models.CharField(max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='JobPosting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jobTitle', models.CharField(max_length=255)),
                ('jobDescription', models.TextField()),
                ('salaryMin', models.IntegerField()),
                ('salaryMax', models.IntegerField()),
                ('jobStatus', models.CharField(choices=[('POSTED', ''), ('INTERVIEW', ''), ('HOLD', ''), ('DONE', ''), ('CANCELED', '')], max_length=255)),
                ('employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobPostings', to='employer.employer')),
            ],
        ),
    ]