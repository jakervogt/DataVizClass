
--#1. List the following details of each employee: 
#employee number, last name, first name, gender, and salary.
Select
employees.emp_no,
employees.last_name,
employees.first_name,
employees.gender,
salaries.salary
from salaries
INNER JOIN employees ON
employees.emp_no=salaries.emp_no;

--#2. List employees who were hired in 1986.
Select * FROM employees 
where extract(year from hire_date)=1986
order by hire_date asc;

--3. List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name, and start and end employment dates.
SELECT departments.dept_no, 
departments.dept_name, 
dept_manager.emp_no,
employees.last_name, 
employees.first_name, 
dept_manager.from_date, 
dept_manager.to_date
FROM departments
JOIN dept_manager
ON departments.dept_no = dept_manager.dept_no
JOIN employees
ON dept_manager.emp_no = employees.emp_no;

--4. List the department of each employee with the following information: 
--employee number, last name, first name, and department name.
Select 
dept_emp.emp_no,
employees.last_name,
employees.first_name,
departments.dept_name
FROM dept_emp
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no;


--5. List all employees whose first name is "Hercules" and last names begin with "B."
Select * from employees 
WHERE  employees.first_name = 'Hercules' and employees.last_name LIKE 'B%'

--6. List all employees in the Sales department, including their employee number, last name, first name, and department name.
Select 
dept_emp.emp_no,
employees.last_name,
employees.first_name,
departments.dept_name
FROM dept_emp
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no
WHERE departments.dept_name = 'Sales'

--7. List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
Select 
dept_emp.emp_no,
employees.last_name,
employees.first_name,
departments.dept_name
FROM dept_emp
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no
WHERE departments.dept_name = 'Sales' 
OR departments.dept_name = 'Development'

--8. In descending order, 
#--ist the frequency count of employee last names, i.e., how many employees share each last name.

SELECT employees.last_name,
COUNT(employees.last_name) AS "Last Name Count"
FROM employees
GROUP BY employees.last_name
ORDER BY
COUNT(employees.last_name) DESC;
