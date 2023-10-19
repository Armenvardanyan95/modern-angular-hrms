export type Project = {
    id: number;
    name: string;
    description: string;
    image: string;
    employees: number[];
    subProjectIds: number[];
}