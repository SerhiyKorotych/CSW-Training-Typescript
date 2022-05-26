import { setupWorker, rest } from "msw";

const Endpoint = "/api/employees";
const ProjectPoint = "/api/projects";

export let EmployeesInfo = [
  {
    id: 1,
    name: "Serhiy Korotych",
    startDate: "03-17-2022",
    role: "SE",
    platoon: "Phoenix",
  },
  {
    id: 2,
    name: "Giacomo Guilizzoni",
    startDate: "02-28-2010",
    role: "SE",
    platoon: "Alchemist",
  },
  {
    id: 3,
    name: "Marco Botton",
    startDate: "12-31-1999",
    role: "TM",
    platoon: "Spartans",
  },
  {
    id: 4,
    name: "Mariah Maclachlan",
    startDate: "09-25-2017",
    role: "JE",
    platoon: "BigBang",
  },
  {
    id: 5,
    name: "Valerie Liberty",
    startDate: "01-01-2018",
    role: "PE",
    platoon: "Alchemist",
  },
];

let ProjectInfo = [
  {
    id: 1,
    name: "projectX",
  },
  {
    id: 2,
    name: "projectY",
  },
  {
    id: 3,
    name: "projectZ",
  },
];

export let allocations = [
  {
    id: 1,
    employee_name: "Serhiy Korotych",
    employee_id: 1,
    project_name: "ProjectX",
    project_id: 1,
    allocation: 50,
  },

  {
    id: 2,
    employee_name: "Giacomo Guilizzoni",
    employee_id: 2,
    project_name: "ProjectY",
    project_id: 2,
    allocation: 10,
  },

  {
    id: 3,
    employee_name: "Marco Botton",
    employee_id: 3,
    project_name: "ProjectZ",
    project_id: 3,
    allocation: 20,
  },
];

const worker = setupWorker(
  rest.get(Endpoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(EmployeesInfo));
  }),

  rest.post(Endpoint, (req, res, ctx) => {
    const id = EmployeesInfo[EmployeesInfo.length - 1]?.id + 1 || 1;
    const newEmployee = {
      id: id,
      name: req.body.name,
      startDate: req.body.startDate,
      role: req.body.role,
      platoon: req.body.platoon,
    };

    const repeated = EmployeesInfo.find((e) => e.name === req.body.name);

    if (repeated !== undefined) {
      return res(ctx.status(400), ctx.json("User already exits"));
    } else {
      EmployeesInfo = [...EmployeesInfo, newEmployee];
      return res(ctx.status(201), ctx.json(newEmployee));
    }
  }),

  rest.patch(`${Endpoint}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { name, startDate, role, platoon } = req.body;
    const objIndex = EmployeesInfo.findIndex((obj) => obj.id == id);
    EmployeesInfo[objIndex].name = name;
    EmployeesInfo[objIndex].startDate = startDate;
    EmployeesInfo[objIndex].role = role;
    EmployeesInfo[objIndex].platoon = platoon;

    return res(ctx.status(200), ctx.json(req.body));
  }),

  rest.delete(`${Endpoint}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    EmployeesInfo = EmployeesInfo.filter((employees) => employees.id != id);
    return res(ctx.status(204));
  }),

  rest.get(`${Endpoint}/:id/projects`, (req, res, ctx) => {
    allocations = allocations.filter(
      (allocation) => allocation.employee_id == req.params.id
    );
    return res(ctx.status(200), ctx.json(allocations));
  }),

  rest.get(`${ProjectPoint}/:id/employees`, (req, res, ctx) => {
    allocations = allocations.filter(
      (allocation) => allocation.project_id == req.params.id
    );
    return res(ctx.status(200), ctx.json(allocations));
  }),

  rest.post(`${Endpoint}/:id/projects`, (req, res, ctx) => {
    const { id } = req.params;
    const { name, allocation } = req.body;
    const project = ProjectInfo.find((p) => p.name === name);
    const employee = EmployeesInfo.at(id - 1);
    const repeated = allocations.find(
      (a) => a.project_name === name && a.employee_name === employee.name
    );
    if (name.length === 0 || allocation === null) {
      return res(
        ctx.status(400),
        ctx.json("You have to input some information")
      );
    } else if (allocation > 100) {
      return res(ctx.status(400), ctx.json("Allocation max value is 100%"));
    } else if (repeated !== undefined) {
      return res(
        ctx.status(400),
        ctx.json("This project is already allocated to this employee")
      );
    }
  }),

  rest.post(`${ProjectPoint}/:id/employees`, (req, res, ctx) => {
    const { id } = req.params;
    const { name, allocation } = req.body;
    const employee = EmployeesInfo.find((e) => e.name === name);
    const project = ProjectInfo.at(id - 1);
    const repeated = allocations.find(
      (a) => a.project_name === project.name && a.employee_name === name
    );
    if (name.length === 0 || allocation === null) {
      return res(
        ctx.status(400),
        ctx.json("You have to input some information")
      );
    } else if (allocation > 100) {
      return res(ctx.status(400), ctx.json("Allocation max value is 100%"));
    } else if (repeated !== undefined) {
      return res(
        ctx.status(400),
        ctx.json("This employee is already allocated in this project")
      );
    } else {
      const newAllocation = {
        project_id: req.params.id,
        project_name: project.name,
        employee_id: employee.id,
        employee_name: name,
        allocation: parseInt(allocation),
      };
      allocations = [...allocations, newAllocation];
      return res(
        ctx.status(201),
        ctx.json({ repeated: repeated, body: req.body, project })
      );
    }
  }),

  rest.get(ProjectPoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ProjectInfo));
  }),

  rest.post(ProjectPoint, (req, res, ctx) => {
    const id = ProjectInfo[ProjectInfo.length - 1]?.id + 1 || 1;
    const newProject = {
      id: id,
      name: req.body.name,
    };

    const repeated = ProjectInfo.find((e) => e.name === req.body.name);

    if (repeated !== undefined) {
      return res(ctx.status(400), ctx.json("User already exits"));
    } else {
      ProjectInfo = [...ProjectInfo, newProject];
      return res(ctx.status(201), ctx.json(newProject));
    }
  }),

  rest.delete(`${Endpoint}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    EmployeesInfo = EmployeesInfo.filter((employee) => employee.id !== id);
    allocations = allocations.filter(
      (allocation) => allocation.employee_id !== id
    );
    return res(ctx.status(204));
  }),

  rest.patch(`${ProjectPoint}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { name } = req.body;
    const objIndex = ProjectInfo.findIndex((obj) => obj.id == id);

    const allocationsMap = allocations.map((a) => {
      if (a.project_name === ProjectInfo[objIndex].name) {
        a.project_name = name;
      }
      return a;
    });
    allocations = allocationsMap;

    ProjectInfo[objIndex].name = name;
    return res(ctx.status(200), ctx.json(allocations));
  }),

  rest.delete(`${ProjectPoint}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    ProjectInfo = ProjectInfo.filter((projects) => projects.id != id);
    allocations = allocations.filter(
      (allocation) => allocation.project_id !== id
    );
    return res(ctx.status(200), ctx.status(204));
  })
);

worker.start();
