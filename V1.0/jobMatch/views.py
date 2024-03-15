from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import HttpResponseRedirect
from django.http import JsonResponse

  
# def signup(request):
#     if request.user.is_authenticated:
#         return redirect('/')
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             password = form.cleaned_data.get('password1')
#             user = authenticate(username=username, password=password)
#             login(request, user)
#             return redirect('/')
#         else:
#             return render(request, 'signup.html', {'form': form})
#     else:
#         form = UserCreationForm()
#         return render(request, 'signup.html', {'form': form})
def signup(request):
    if request.user.is_authenticated:
        return JsonResponse({'error': 'Already authenticated'}, status=400)
    
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({'success': 'User created and logged in'}, status=201)
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)   

def home(request): 
    return render(request, 'index.html')
   
  
# def signin(request):
#     if request.user.is_authenticated:
#         return redirect('/profile')  # Redirect to profile if already authenticated
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return redirect('/profile') #profile
#         else:
#             msg = 'Invalid username or password. Please try again.'
#             form = AuthenticationForm(request.POST)
#             return render(request, 'login.html', {'form': form, 'msg': msg})
#     else:
#         form = AuthenticationForm()
#         return render(request, 'login.html', {'form': form})
def signin(request):
    if request.user.is_authenticated:
        return JsonResponse({'error': 'Already authenticated'}, status=400)
    
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'success': 'Logged in'}, status=200)
        
        return JsonResponse({'error': 'Invalid username or password'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
def profile(request): 
    return render(request, 'profile.html')
   
# def signout(request):
#     logout(request)
#     return redirect('/')

def signout(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({'success': 'Logged out'}, status=200)
    else:
        return JsonResponse({'error': 'Not authenticated'}, status=400)