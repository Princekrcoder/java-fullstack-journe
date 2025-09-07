import java.util.*;
public class callFunction {

    public static void printMyName(String name) {
        System.out.println("My name is " + name);
        return;
    }

    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter name : ");
        String name = sc.next();

        printMyName(name);

        sc.close();
    }
}
